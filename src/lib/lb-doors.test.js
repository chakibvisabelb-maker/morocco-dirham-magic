import { describe, expect, test } from 'bun:test';
import catalogue from '@/assets/catalogues/lb-doors';
import { cataloguePageUrl, categories, lowBudgetCategories, LOW_BUDGET } from '@/lib/products';

const lowBudgetDoors = lowBudgetCategories.find(category => category.slug === 'lb-doors');

describe('Low Budget Doors catalogue', () => {
  test('adds three organised pages without replacing High-Mid Doors', () => {
    expect(catalogue.pages).toHaveLength(3);
    expect(lowBudgetDoors?.pages).toHaveLength(3);
    expect(lowBudgetDoors?.group).toBe(LOW_BUDGET);
    expect(categories.find(category => category.slug === 'doors')?.pages.length).toBeGreaterThan(0);
    expect(catalogue.pages.map(page => page.section.en)).toEqual([
      'Wooden doors',
      'Aluminium glass door & finishes',
      'Additional door designs',
    ]);
  });

  test('removes quotation prices and personal details from every language', () => {
    for (const page of catalogue.pages) {
      expect(`${page.text} ${page.frText} ${page.arText}`).not.toMatch(/RMB|Price|EURO|MAD|FOB|345|292|CHENG/i);
      expect(page.convertedPrices).toBe(0);
    }
  });

  test('preserves door references, dimensions and finishes', () => {
    expect(catalogue.pages[0].text).toContain('SPSDM001');
    expect(catalogue.pages[0].text).toContain('SPSFJM001');
    expect(catalogue.pages[0].text).toContain('204H X 95 W');
    expect(catalogue.pages[0].text).toContain('204 H X 85W');
    expect(catalogue.pages[1].text).toContain('BLM001');
    expect(catalogue.pages[1].text).toContain('204 H x 75W');
    expect(catalogue.pages[1].text).toContain('Walnut No. 4');
    expect(catalogue.pages[2].text).toContain('ZY-2106');
  });

  test('uses French pages and keeps Arabic search with the English visual fallback', () => {
    for (const page of catalogue.pages) {
      expect(cataloguePageUrl(page, 'fr')).toBe(page.frUrl);
      expect(cataloguePageUrl(page, 'ar')).toBe(page.url);
      expect(page.arText.length).toBeGreaterThan(0);
    }
  });
});
