/**
 * Supplier prices are quoted in Chinese yuan (CNY).
 * The catalogue is displayed in Moroccan dirham (MAD) and euro (EUR).
 * Market rates as of 9 October 2026.
 */
export const CNY_TO_MAD = 1.48;
export const CNY_TO_EUR = 0.1335;

const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export function cnyToMad(priceCny: number): number {
  return Math.round((priceCny * CNY_TO_MAD) / 10) * 10;
}

export function cnyToEur(priceCny: number): number {
  return Math.round(priceCny * CNY_TO_EUR);
}

/** e.g. "20 010 MAD / 1 805 EUR" */
export function formatMadEurFromCny(priceCny: number): string {
  return `${group(cnyToMad(priceCny))} MAD / ${group(cnyToEur(priceCny))} EUR`;
}
