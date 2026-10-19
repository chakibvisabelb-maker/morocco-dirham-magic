import { describe, expect, test } from 'bun:test';
import catalogue from '@/assets/catalogues/enclosures.json';

describe('replacement shower enclosure catalogue', () => {
  test('includes all nine pages from the replacement source', () => {
    expect(catalogue.pages).toHaveLength(9);
    expect(catalogue.pages[7]?.text).toContain('E005');
  });

  test('preserves source dimensions beside removed price suffixes', () => {
    expect(catalogue.pages[1]?.text).toContain('900*900*1850mm');
    expect(catalogue.pages[2]?.text).toContain('90cm 90cm or 80cm 80cm');
    expect(catalogue.pages[3]?.text).toContain('800mm*800mm*1850mm');
    expect(catalogue.pages[4]?.text).toContain('1850mm');
    expect(catalogue.pages[8]?.text).toContain('L2000mm*H2000mm');
  });

  test('contains no prices in either language search data', () => {
    for (const page of catalogue.pages) {
      expect(`${page.text} ${page.frText}`).not.toMatch(/price|FOB|EURO|MAD|62\.33|109\.95|98\.73|96\.68|87\.83|91\.83|128\.5|80\.00/i);
      expect(page.convertedPrices).toBe(0);
    }
  });
});