import { expect, test } from 'bun:test';
import locks from '@/assets/catalogues/locks.json';
import { categories, cataloguePageUrl } from '@/lib/products';

test('Smart Locks retains only the four visually matched quotation designs', () => {
  expect(locks.pages.map(page => page.url.split('/').pop())).toEqual([
    'locks-008.jpg', 'locks-011.jpg', 'locks-013.jpg', 'locks-014.jpg',
  ]);
  expect(categories.find(category => category.slug === 'locks')?.pages).toHaveLength(4);
  expect(locks.pages.map(page => page.text)).toEqual(['Number 1\nG3', 'F7\nG10', 'X7\nG7', 'Number 8\nG9']);
});

test('Matched lock pages preserve localized image selection and contain no quotation prices', () => {
  for (const page of locks.pages) {
    expect(cataloguePageUrl(page, 'fr')).toBe(page.frUrl);
    expect(cataloguePageUrl(page, 'en')).toBe(page.url);
    expect(page.convertedPrices).toBe(0);
    expect(page.text).not.toMatch(/RMB|EUR|MAD|99|169|259|309|399|469|499|529|539/);
  }
});