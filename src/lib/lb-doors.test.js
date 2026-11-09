import { describe, expect, test } from 'bun:test';
import catalogue from '@/assets/catalogues/lb-doors';
import { cataloguePageUrl, categories, lowBudgetCategories, LOW_BUDGET } from '@/lib/products';

const lowBudgetDoors = lowBudgetCategories.find(category => category.slug === 'lb-doors');
const references = ['SPSDM001', 'SPSFJM001', 'BLM001', 'ZY-2008', 'ZY-2063', 'ZY-2103', 'ZY-2105', 'ZY-2106'];

describe('Low Budget Doors catalogue', () => {
  test('gives each of the eight doors its own page without replacing High-Mid Doors', () => {
    expect(catalogue.pages).toHaveLength(8);
    expect(lowBudgetDoors?.pages).toHaveLength(8);
    expect(lowBudgetDoors?.group).toBe(LOW_BUDGET);
    expect(categories.find(category => category.slug === 'doors')?.pages.length).toBeGreaterThan(0);
    expect(new Set(catalogue.pages.map(page => page.url)).size).toBe(8);
    expect(catalogue.pages.map(page => page.section.en)).toEqual([
      'Wooden doors',
      'Wooden doors',
      'Aluminium glass door',
      'Additional door designs',
      'Additional door designs',
      'Additional door designs',
      'Additional door designs',
      'Additional door designs',
    ]);
    catalogue.pages.forEach((page, index) => {
      expect(page.text).toContain(references[index]);
      references.filter(reference => reference !== references[index]).forEach(reference => {
        expect(page.text).not.toContain(reference);
      });
    });
  });

  test('removes quotation prices and personal details from every language', () => {
    for (const page of catalogue.pages) {
      expect(`${page.text} ${page.frText} ${page.arText}`).not.toMatch(/RMB|Price|EURO|MAD|FOB|345|292|CHENG/i);
      expect(page.convertedPrices).toBe(0);
    }
  });

  test('keeps each measurement and associated item with its own door', () => {
    expect(catalogue.pages[0].text).toContain('204H X 95 W');
    expect(catalogue.pages[0].text).toContain('Door core');
    expect(catalogue.pages[0].text).toContain('Lock and hardware set');
    expect(catalogue.pages[1].text).toContain('204 H X 85W');
    expect(catalogue.pages[1].text).toContain('Honeycomb paper core');
    expect(catalogue.pages[2].text).toContain('204 H x 75W');
    expect(catalogue.pages[2].text).toContain('Honeycomb paper core');
    expect(catalogue.pages[3].text).toContain('Mishan');
    expect(catalogue.pages[3].text).toContain('Jinghe');
    expect(catalogue.pages[4].text).toContain('Walnut No. 4');
    expect(catalogue.pages[4].text).toContain('Shiyu');
    for (const page of catalogue.pages.slice(5)) {
      expect(page.text).toContain('Frame Anran matte');
    }
  });

  test('uses French pages and keeps Arabic search with the English visual fallback', () => {
    for (const page of catalogue.pages) {
      expect(cataloguePageUrl(page, 'fr')).toBe(page.frUrl);
      expect(cataloguePageUrl(page, 'ar')).toBe(page.url);
      expect(page.arText.length).toBeGreaterThan(0);
    }
  });
});
