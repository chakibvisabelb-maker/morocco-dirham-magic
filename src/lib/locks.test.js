import { expect, test } from 'bun:test';
import locks from '@/assets/catalogues/locks.json';
import { categories, cataloguePageUrl } from '@/lib/products';

test('Smart Locks keeps only seven visual matches from both November attachments', () => {
  expect(locks.pages.map(page => page.url.split('/').pop())).toEqual(
    [2, 8, 9, 11, 13, 14, 22].map(number => `locks-${String(number).padStart(3, '0')}.jpg`),
  );
  expect(categories.find(category => category.slug === 'locks')?.pages).toHaveLength(7);
  expect(locks.pages.map(page => page.text)).toEqual([
    'C919 — X10', 'Number 1 — G3 / Porsche No. 1', 'X9 — X9',
    'F7 — G10 / F5', 'X7 — G7', 'Number 8 — G9', 'DDP7 — GY42',
  ]);
  expect(locks.pdf.split('/').pop()).toBe('locks-nov-en.pdf');
  expect(locks.pdfFr.split('/').pop()).toBe('locks-nov-fr.pdf');
});

test('Matched lock pages retain localized images without quotation prices', () => {
  for (const page of locks.pages) {
    expect(cataloguePageUrl(page, 'fr')).toBe(page.frUrl);
    expect(cataloguePageUrl(page, 'en')).toBe(page.url);
    expect(page.convertedPrices).toBe(0);
    expect(page.text).not.toMatch(/RMB|EUR|MAD|¥|€/);
    expect(page.frText).not.toMatch(/RMB|EUR|MAD|¥|€/);
  }
});
