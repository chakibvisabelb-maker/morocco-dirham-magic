import { describe, expect, test } from 'bun:test';
import catalogue from '@/assets/catalogues/lowbudget.json';
import showersAdvanced from '@/assets/catalogues/showers-advanced.json';
import { cataloguePageUrl, lowBudgetCategories } from '@/lib/products';

const additions = {
  'lb-taps': catalogue.taps.pages.at(-1),
  'lb-showers-advanced': showersAdvanced.pages.at(-1),
  'lb-toilets': catalogue.toilets.pages.at(-1),
  'lb-basins': catalogue.basins.pages[0],
};

describe('Low Budget bathroom sample addition', () => {
  test('puts each source page in its associated product type', () => {
    expect(lowBudgetCategories.find(c => c.slug === 'lb-taps')?.pages).toHaveLength(11);
    expect(lowBudgetCategories.find(c => c.slug === 'lb-showers-advanced')?.pages).toHaveLength(11);
    expect(lowBudgetCategories.find(c => c.slug === 'lb-toilets')?.pages).toHaveLength(6);
    expect(lowBudgetCategories.find(c => c.slug === 'lb-basins')?.pages).toHaveLength(1);
    for (const [slug, page] of Object.entries(additions)) {
      expect(lowBudgetCategories.find(c => c.slug === slug)?.pages.at(-1)?.url).toBe(page.url);
      expect(page.url).toContain('-nov9-en.jpg');
    }
  });

  test('removes every source price from English and French search data', () => {
    for (const page of Object.values(additions)) {
      expect(`${page.text} ${page.frText}`).not.toMatch(/EXW|Price|EURO|MAD|1\.65|2\.80|8\.80|9\.10|26\.50/i);
      expect(page.convertedPrices).toBe(0);
    }
  });

  test('preserves the product sizes, model and toilet dimensions', () => {
    expect(additions['lb-taps'].text).toContain('8cm');
    expect(additions['lb-taps'].text).toContain('11cm');
    expect(additions['lb-basins'].text).toContain('Model 202');
    expect(additions['lb-basins'].text).toContain('520 × 440 × 830 mm');
    expect(additions['lb-toilets'].text).toContain('650 × 380 × 740 mm');
    expect(additions['lb-toilets'].text).toContain('180 mm');
  });

  test('uses the matching French page for every added item', () => {
    for (const page of Object.values(additions)) {
      expect(cataloguePageUrl(page, 'fr')).toBe(page.frUrl);
      expect(page.frUrl).not.toBe(page.url);
    }
    expect(additions['lb-basins'].frText).toContain('Modèle 202');
    expect(additions['lb-toilets'].frText).toContain('WC en céramique');
  });
});
