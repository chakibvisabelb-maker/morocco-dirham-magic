import { test, expect } from 'bun:test';
import handles from '../assets/catalogues/door-handles.json';
import { categories, lowBudgetCategories, cataloguePageUrl } from './products';

test('Door handles is a High-Mid catalogue containing all product spreads', () => {
  expect(categories.find(category => category.slug === 'door-handles')?.pages.length).toBe(140);
  expect(lowBudgetCategories.some(category => category.slug === 'door-handles')).toBe(false);
  expect(handles.pages[0].url).toContain('005-en.jpg');
  expect(handles.pages[139].url).toContain('144-en.jpg');
});

test('Handle pages and downloads select the matching language', () => {
  for (const page of handles.pages) {
    expect(cataloguePageUrl(page, 'en')).toBe(page.url);
    expect(cataloguePageUrl(page, 'fr')).toBe(page.frUrl);
    expect(cataloguePageUrl(page, 'ar')).toBe(page.arUrl);
    expect(page.frText.length).toBeGreaterThan(0);
    expect(page.arText.length).toBeGreaterThan(0);
  }
});

test('Door handle content contains no prices or untranslated Chinese', () => {
  for (const page of handles.pages) {
    expect([page.text, page.frText, page.arText].join(' ')).not.toMatch(/[¥￥\u3400-\u9fff]|\bPRICE\b|\bFOB\b|\bMAD\b|\bEUR\b|ELLE\s*CASA/i);
    expect(page.convertedPrices).toBe(0);
  }
});

test('Door handle references and door thickness survive price removal', () => {
  const text = handles.pages.map(page => page.text).join(' ');
  expect(text).toContain('6A1701');
  expect(text).toMatch(/35\s*[-–]\s*50/);
});