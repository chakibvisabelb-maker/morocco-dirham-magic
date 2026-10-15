import { numberCatalogueImage } from '@/lib/catalogue-numbering';

// Builds a PDF in the browser from the catalogue page images currently shown.
export async function buildCataloguePdf(pages: { url: string; number: number }[]): Promise<Blob> {
  const { PDFDocument } = await import('pdf-lib');
  const pdf = await PDFDocument.create();
  // Process sequentially to avoid holding dozens of full-size canvases in memory.
  for (const item of pages) {
    const blob = await numberCatalogueImage(item.url, item.number);
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;
    const img = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
    const scale = 0.45; // image pixels -> PDF points
    const page = pdf.addPage([img.width * scale, img.height * scale]);
    page.drawImage(img, { x: 0, y: 0, width: img.width * scale, height: img.height * scale });
  }
  const data = await pdf.save();
  return new Blob([data as BlobPart], { type: 'application/pdf' });
}

type SaveFilePicker = (options: {
  suggestedName?: string;
  types?: { description: string; accept: Record<string, string[]> }[];
}) => Promise<{ createWritable(): Promise<{ write(data: Blob): Promise<void>; close(): Promise<void> }> }>;

// Same-origin blob download: the browser writes the file to the computer.
function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 120_000);
}

export type SaveOutcome = 'saved' | 'shared' | 'downloaded' | 'cancelled';

// The location picker only works in a top-level window: inside an iframe (the
// editor preview) it is blocked, so there we go straight to a plain download.
function canPickLocation() {
  try {
    return window.top === window.self;
  } catch {
    return false;
  }
}

// Must be called synchronously from the click handler so the browser keeps the
// user activation the save dialog needs. The PDF is therefore built in advance.
export async function saveToComputer(blob: Blob, filename: string): Promise<SaveOutcome> {
  const picker = (window as unknown as { showSaveFilePicker?: SaveFilePicker }).showSaveFilePicker;
  if (typeof picker === 'function' && canPickLocation()) {
    try {
      const handle = await picker({
        suggestedName: filename,
        types: [{ description: 'PDF', accept: { 'application/pdf': ['.pdf'] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return 'saved';
    } catch (error) {
      if ((error as DOMException)?.name === 'AbortError') return 'cancelled';
      // Picker unavailable (e.g. inside an iframe): fall back to a plain download.
    }
  }
  const file = new File([blob], filename, { type: 'application/pdf' });
  if (matchMedia('(pointer: coarse)').matches && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: filename });
      return 'shared';
    } catch (error) {
      if ((error as DOMException).name === 'AbortError') return 'cancelled';
    }
  }
  triggerDownload(blob, filename);
  return 'downloaded';
}
