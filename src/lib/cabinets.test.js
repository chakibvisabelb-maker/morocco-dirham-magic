import { describe, expect, test } from 'bun:test';
import catalogue from '@/assets/catalogues/lowbudget.json';
import { lowBudgetCategories } from '@/lib/products';

const cabinets = catalogue.cabinets;

describe('low budget cabinets catalogue', () => {
  test('keeps all nine pages from the source', () => {
    expect(cabinets.pages).toHaveLength(9);
    expect(lowBudgetCategories.find(c => c.slug === 'lb-cabinets')?.pages).toHaveLength(9);
  });

  test('keeps the sizes that sit next to the price line', () => {
    expect(cabinets.pages[2]?.text).toContain('60cm-100cm');
    expect(cabinets.pages[2]?.frText).toContain('60cm-100cm');
    expect(cabinets.pages[4]?.text).toContain('60CM');
    expect(cabinets.pages[4]?.frText).toContain('60CM');
    expect(cabinets.pages[6]?.text).toContain('60cm');
    expect(cabinets.pages[6]?.frText).toContain('60cm');
    expect(cabinets.pages[8]?.text).toContain('60cm-80cm');
    expect(cabinets.pages[8]?.frText).toContain('60cm-80cm');
  });

  test('contains no prices in the search data', () => {
    for (const page of cabinets.pages) {
      expect(`${page.text} ${page.frText}`).not.toMatch(/price|FOB|EURO|MAD/i);
      expect(page.convertedPrices).toBe(0);
    }
  });
});
