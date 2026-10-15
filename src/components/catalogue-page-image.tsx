import { useEffect, useRef, useState } from 'react';
import { numberedPageHeight, numberCatalogueImage } from '@/lib/catalogue-numbering';

export function CataloguePageImage({ src, number, alt, width, height, className }: { src: string; number: number; alt: string; width: number; height: number; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState<{ key: string; url: string }>();
  const key = `${src}|${number}`;
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let cancelled = false;
    let objectUrl: string | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      void numberCatalogueImage(src, number).then(blob => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setImage({ key, url: objectUrl });
      }).catch(() => { /* Keep the placeholder instead of displaying an incorrect number. */ });
    }, { rootMargin: '600px' });
    observer.observe(element);
    return () => { cancelled = true; observer.disconnect(); if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [src, number, key]);
  const outputHeight = numberedPageHeight(src, height);
  const placeholder = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${outputHeight}"/>`)}`;
  return <img ref={ref} src={image?.key === key ? image.url : placeholder} alt={alt} width={width} height={outputHeight} className={className} />;
}