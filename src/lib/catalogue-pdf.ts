// Builds a PDF in the browser from the catalogue page images currently shown.
export async function buildCataloguePdf(urls: string[]): Promise<Blob> {
  const { PDFDocument } = await import('pdf-lib');
  const pdf = await PDFDocument.create();
  const images = await Promise.all(urls.map(async url => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Image ${res.status}`);
    return new Uint8Array(await res.arrayBuffer());
  }));
  for (const bytes of images) {
    const isPng = bytes[0] === 0x89 && bytes[1] === 0x50;
    const img = isPng ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
    const scale = 0.45; // image pixels -> PDF points
    const page = pdf.addPage([img.width * scale, img.height * scale]);
    page.drawImage(img, { x: 0, y: 0, width: img.width * scale, height: img.height * scale });
  }
  const data = await pdf.save();
  return new Blob([data as BlobPart], { type: 'application/pdf' });
}

export function saveBlob(blob: Blob, filename: string): string {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 120_000);
  return url;
}
