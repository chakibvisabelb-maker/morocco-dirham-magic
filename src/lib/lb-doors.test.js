import { describe, expect, test } from 'bun:test';
import catalogue from '@/assets/catalogues/lb-doors';
import { cataloguePageUrl, categories, lowBudgetCategories, LOW_BUDGET } from '@/lib/products';

const lowBudgetDoors = lowBudgetCategories.find(category => category.slug === 'lb-doors');
const references = ['SPSDM001', 'SPSFJM001', 'BLM001', 'ZY-2008', 'ZY-2063', 'ZY-2103', 'ZY-2105', 'ZY-2106', 'RZX-9001', 'RZX-9002', 'RZX-9005', 'RZX-9018', 'RZX-9027', 'RZX-9028', 'RZX-9012'];

describe('Low Budget Doors catalogue', () => {
  test('gives all eight existing and seven attached doors separate pages without replacing High-Mid Doors', () => {
    expect(catalogue.pages).toHaveLength(15);
    expect(lowBudgetDoors?.pages).toHaveLength(15);
    expect(lowBudgetDoors?.group).toBe(LOW_BUDGET);
    expect(categories.find(category => category.slug === 'doors')?.pages.length).toBeGreaterThan(0);
    expect(new Set(catalogue.pages.map(page => page.url)).size).toBe(15);
    expect(catalogue.pages.map(page => page.section.en)).toEqual([
      'Wooden doors',
      'Wooden doors',
      'Aluminium glass door',
      'Additional door designs',
      'Additional door designs',
      'Additional door designs',
      'Additional door designs',
      'Additional door designs',
      ...Array(7).fill('RZX door designs'),
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

  test('keeps the original measurements without accessory panels or invented sizes for the attachment', () => {
    expect(catalogue.pages[0].text).toContain('204H X 95 W');
    expect(catalogue.pages[0].text).toContain('975 954 910');
    expect(catalogue.pages[1].text).toContain('204 H X 85W');
    expect(catalogue.pages[1].text).toContain('914 894 850');
    expect(catalogue.pages[2].text).toContain('204 H x 75W');
    expect(catalogue.pages[2].text).toContain('814 794 750');
    for (const page of catalogue.pages) {
      expect(page.text).not.toMatch(/core|hardware|quantity|associated finish/i);
    }
    for (const [index, page] of catalogue.pages.slice(8).entries()) {
      expect(page.text).toBe(references[index + 8]);
    }
  });

  test('uses localized French and Arabic pages for display and downloads', () => {
    for (const page of catalogue.pages) {
      expect(cataloguePageUrl(page, 'fr')).toBe(page.frUrl);
      expect(cataloguePageUrl(page, 'ar')).toBe(page.arUrl);
      expect(page.arUrl).not.toBe(page.url);
      expect(page.arText.length).toBeGreaterThan(0);
    }
  });
});
