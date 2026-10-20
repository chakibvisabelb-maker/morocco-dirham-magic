import { describe, expect, test } from 'bun:test';
import catalogue from '@/assets/catalogues/lowbudget.json';
import { lowBudgetCategories } from '@/lib/products';

const taps = catalogue.taps;

describe('low budget taps catalogue (water_tap_2 update)', () => {
  test('includes all ten pages from the replacement source', () => {
    expect(taps.pages).toHaveLength(10);
    expect(lowBudgetCategories.find(c => c.slug === 'lb-taps')?.pages).toHaveLength(10);
  });

  test('keeps the five model references in order', () => {
    ['B001', 'B002', 'B003', 'B004', 'B005'].forEach((code, i) => {
      expect(taps.pages[i * 2]?.text).toBe(code);
      expect(taps.pages[i * 2 + 1]?.text).toBe('');
    });
  });

  test('contains no prices in the search data', () => {
    for (const page of taps.pages) {
      expect(`${page.text} ${page.frText}`).not.toMatch(/price|FOB|EURO|MAD|2\.30|5\.35|4\.53|8\.60/i);
      expect(page.convertedPrices).toBe(0);
    }
  });
});
