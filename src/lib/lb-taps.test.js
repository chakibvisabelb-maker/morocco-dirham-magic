import { describe, expect, test } from 'bun:test';
import catalogue from '@/assets/catalogues/lowbudget.json';
import { lowBudgetCategories } from '@/lib/products';

const taps = catalogue.taps;

describe('low budget taps catalogue (water_tap_2 update)', () => {
  test('keeps the ten replacement pages and adds two separate tap pages', () => {
    expect(taps.pages).toHaveLength(12);
    expect(lowBudgetCategories.find(c => c.slug === 'lb-taps')?.pages).toHaveLength(12);
  });

  test('splits the 8cm and 11cm taps onto separate English and French pages', () => {
    const [zinc, plastic] = taps.pages.slice(-2);
    expect(zinc.text).toBe('Zinc Alloy\n8cm\nConnecting pipe included');
    expect(zinc.frText).toBe('Alliage de zinc\n8cm\nFlexible de raccordement inclus');
    expect(plastic.text).toBe('Plastic Faucet\n11cm\nConnecting pipe included');
    expect(plastic.frText).toBe('Robinet en plastique\n11cm\nFlexible de raccordement inclus');
    expect(zinc.url).not.toBe(plastic.url);
    expect(zinc.frUrl).not.toBe(plastic.frUrl);
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
