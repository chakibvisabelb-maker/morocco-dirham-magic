import { describe, expect, test } from 'bun:test';
import catalogue from '@/assets/catalogues/lb-doors';
import { cataloguePageUrl, categories, lowBudgetCategories, LOW_BUDGET } from '@/lib/products';

const lowBudgetDoors = lowBudgetCategories.find(category => category.slug === 'lb-doors');
const references = ['SPSDM001', 'SPSFJM001', 'BLM001', 'ZY-2008', 'ZY-2063', 'ZY-2103', 'ZY-2105', 'ZY-2106', 'RZX-9001', 'RZX-9002', 'RZX-9005', 'RZX-9018', 'RZX-9027', 'RZX-9028', 'RZX-9012', 'YS-8208', 'ZP704-Y1', 'ZP701-Y1', 'YS-8186', 'YS-8153', 'ZP608-Y3'];

describe('Low Budget Doors catalogue', () => {
  test('gives all existing and newly attached door designs separate pages without replacing High-Mid Doors', () => {
    expect(catalogue.pages).toHaveLength(21);
    expect(lowBudgetDoors?.pages).toHaveLength(21);
    expect(lowBudgetDoors?.group).toBe(LOW_BUDGET);
    expect(categories.find(category => category.slug === 'doors')?.pages.length).toBeGreaterThan(0);
    expect(new Set(catalogue.pages.map(page => page.url)).size).toBe(21);
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
      ...Array(6).fill('Wooden doors — measured designs'),
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
    for (const [index, page] of catalogue.pages.slice(8, 15).entries()) {
      expect(page.text).toBe(references[index + 8]);
    }
  });

  test('matches every new photograph to its source CAD measurements', () => {
    const widths = [950, 950, 850, 850, 750, 750];
    const articles = ['TBA', 'TBA', '1110', '1110', '1108', '1108'];
    catalogue.pages.slice(15).forEach((page, index) => {
      for (const text of [page.text, page.frText, page.arText]) {
        expect(text).toContain(references[index + 15]);
        expect(text).toContain(articles[index]);
        expect(text).toContain(`2040 × ${widths[index]} mm`);
        expect(text).toContain('1000 58 10 160 4');
        expect(text).not.toMatch(/369|327|184500|490500|163500|PRICE|RMB|Mr\.|quantity/i);
      }
    });
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
