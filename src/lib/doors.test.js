import { test, expect } from 'bun:test';
import doors from '../assets/catalogues/doors.json';
import { categories, lowBudgetCategories, cataloguePageUrl } from './products';

test('Doors belongs only to High-Mid and includes both product catalogues', () => {
  expect(categories.find(category => category.slug === 'doors')?.pages.length).toBe(72);
  expect(lowBudgetCategories.some(category => category.slug === 'doors')).toBe(false);
  expect(new Set(doors.pages.map(page => page.section.en)).size).toBe(2);
});

test('Door pages and downloads use the selected language', () => {
  for (const page of doors.pages) {
    expect(cataloguePageUrl(page, 'en')).toBe(page.url);
    expect(cataloguePageUrl(page, 'fr')).toBe(page.frUrl);
    expect(cataloguePageUrl(page, 'ar')).toBe(page.arUrl);
    expect(page.arUrl).toBeTruthy();
    expect(page.frText).toBeTruthy();
    expect(page.arText).toBeTruthy();
  }
});

test('Door searchable content excludes companies, Chinese and prices', () => {
  for (const page of doors.pages) {
    const text = [page.text, page.frText, page.arText].join(' ');
    expect(text).not.toMatch(/YAGOOD|雅固|[\u3400-\u9fff]|https?:|www\.|\bFOB\b|\bMAD\b|\bEUR\b/i);
    expect(page.convertedPrices).toBe(0);
  }
});

test('Door product references and technical sizes are retained', () => {
  const text = doors.pages.map(page => page.text).join(' ');
  expect(text).toContain('YG-01');
  expect(text).toContain('YKD-2501');
  expect(text).toContain('60mm');
});