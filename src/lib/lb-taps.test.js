import { describe, expect, test } from 'bun:test';
import catalogue from '@/assets/catalogues/lowbudget.json';
import { lowBudgetCategories } from '@/lib/products';

const taps = catalogue.taps;

describe('low budget taps catalogue (water_tap_2 update)', () => {
  test('removes original pages 5 and 6 while keeping the other ten pages', () => {
    expect(taps.pages).toHaveLength(10);
    expect(lowBudgetCategories.find(c => c.slug === 'lb-taps')?.pages).toHaveLength(10);
    expect(taps.pages.some(page => /lb-taps-oct20-0[56]\.jpg$/.test(page.url))).toBe(false);
    expect(taps.pages[4].url).toContain('lb-taps-oct20-07.jpg');
    expect(taps.pages.some(page => page.text === 'B003')).toBe(false);
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

  test('keeps the four remaining model references in order', () => {
    ['B001', 'B002', 'B004', 'B005'].forEach((code, i) => {
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
