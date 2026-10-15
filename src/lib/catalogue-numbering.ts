import regions from '@/assets/catalogues/page-number-regions.json';

type NumberRegion = { x: number; y: number; width: number; height: number; fontSize: number };
const numberRegions: Record<string, NumberRegion> = regions;

export function numberedPageHeight(url: string, height: number) {
  return numberRegions[url] ? height : height + Math.max(36, Math.round(height * 0.03));
}

// The same pixels are used in the viewer and PDF, so moved pages cannot retain
// their source catalogue number. Source images and prices remain untouched.
export async function numberCatalogueImage(url: string, number: number): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Catalogue image ${response.status}`);
  const image = await createImageBitmap(await response.blob());
  try {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = numberedPageHeight(url, image.height);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Catalogue image canvas unavailable');
    context.drawImage(image, 0, 0);
    const region = numberRegions[url];
    if (region) {
      const x = Math.round(region.x * image.width);
      const y = Math.round(region.y * image.height);
      const width = Math.ceil(region.width * image.width);
      const height = Math.ceil(region.height * image.height);
      // Sample the existing number panel rather than assuming its colour.
      const pixel = context.getImageData(x + 1, y + Math.floor(height / 2), 1, 1).data;
      context.fillStyle = `rgb(${pixel[0]} ${pixel[1]} ${pixel[2]})`;
      context.fillRect(x, y, width, height);
      context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--catalogue-number-ink').trim();
      context.font = `700 ${region.fontSize * image.height}px Arial, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(String(number).padStart(2, '0'), x + width / 2, y + height / 2, width - 4);
    } else {
      const styles = getComputedStyle(document.documentElement);
      context.fillStyle = styles.getPropertyValue('--catalogue-page-paper').trim();
      context.fillRect(0, image.height, canvas.width, canvas.height - image.height);
      context.fillStyle = styles.getPropertyValue('--catalogue-page-ink').trim();
      context.font = `500 ${(canvas.height - image.height) * 0.55}px Arial, sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(String(number).padStart(2, '0'), canvas.width / 2, (image.height + canvas.height) / 2);
    }
    return await new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Catalogue image encoding failed')), 'image/jpeg', 0.94));
  } finally {
    image.close();
  }
}