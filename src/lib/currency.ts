/**
 * Supplier prices are quoted in Chinese yuan (CNY).
 * The whole catalogue is displayed in Moroccan dirham (MAD).
 * Change this single rate to re-price the entire site.
 */
export const CNY_TO_MAD = 1.4;

export function cnyToMad(priceCny: number): number {
  return Math.round((priceCny * CNY_TO_MAD) / 10) * 10;
}

/** Formats a yuan price as a dirham price, e.g. 4 990 MAD */
export function formatMadFromCny(priceCny: number): string {
  const grouped = String(cnyToMad(priceCny)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} MAD`;
}
