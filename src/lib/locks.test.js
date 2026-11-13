import { expect, test } from 'bun:test';
import locks from '@/assets/catalogues/locks.json';
import { categories, cataloguePageUrl } from '@/lib/products';

test('Smart Locks restores all 37 original pages in source order', () => {
  expect(locks.pages.map(page => page.url.split('/').pop())).toEqual(
    Array.from({ length: 37 }, (_, index) => `locks-${String(index + 1).padStart(3, '0')}.jpg`),
  );
  expect(categories.find(category => category.slug === 'locks')?.pages).toHaveLength(37);
  expect(locks.pdf.split('/').pop()).toBe('locks-mad.pdf');
  expect(locks.pdfFr.split('/').pop()).toBe('locks-fr.pdf');
});

test('Restored lock pages retain localized images without prices', () => {
  for (const page of locks.pages) {
    expect(cataloguePageUrl(page, 'fr')).toBe(page.frUrl);
    expect(cataloguePageUrl(page, 'en')).toBe(page.url);
    expect(page.convertedPrices).toBe(0);
    expect(page.text).not.toMatch(/RMB|EUR|MAD|¥|€/);
    expect(page.frText).not.toMatch(/RMB|EUR|MAD|¥|€/);
  }
});
