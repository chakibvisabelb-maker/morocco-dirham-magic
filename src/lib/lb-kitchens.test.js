import { describe, expect, test } from 'bun:test';
import kitchens from '@/assets/catalogues/kitchens.json';
import { cataloguePageUrl, lowBudgetCategories, categories } from '@/lib/products';

describe('Low Budget kitchen photo-only catalogue', () => {
  test('removes measurements and specifications from every searchable page', () => {
    expect(kitchens.pages).toHaveLength(7);
    for (const page of kitchens.pages) {
      expect([page.text, page.frText, page.arText].join(' ')).not.toMatch(/\d|\bCM\b|F001|F002|F003|stainless|quartz|cabinet|included/i);
      expect(page.convertedPrices).toBe(0);
    }
  });

  test('uses the replacement photo pages in every language and the matching PDF', () => {
    for (const page of kitchens.pages) {
      for (const language of ['en', 'fr', 'ar']) {
        expect(cataloguePageUrl(page, language)).toContain('/kitchens-photo-only-');
      }
    }
    expect(kitchens.pdf).toEndWith('/luxora-kitchens-photo-only.pdf');
    expect(lowBudgetCategories.find(category => category.slug === 'kitchens')?.pages).toEqual(kitchens.pages);
    expect(categories.some(category => category.slug === 'hm-kitchens')).toBe(false);
  });
});