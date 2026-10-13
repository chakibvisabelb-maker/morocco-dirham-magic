import bathtubs from '@/assets/catalogues/bathtubs.json';
import bathroom from '@/assets/catalogues/bathroom.json';
import faucets from '@/assets/catalogues/faucets.json';
import fixtures from '@/assets/catalogues/fixtures.json';
import locks from '@/assets/catalogues/locks.json';

export type Localized = { fr: string; en: string; ar: string };
export type CataloguePage = { url: string; width: number; height: number; text: string; convertedPrices: number };
export type Category = { slug: string; name: Localized; tagline: Localized; description: Localized; image: string; pages: CataloguePage[]; pdf: string };

export const categories: Category[] = [
  { ...bathtubs, name: { fr: 'Baignoires et spas', en: 'Bathtubs & spas', ar: 'أحواض الاستحمام والسبا' }, tagline: { fr: 'Baignoires', en: 'Bathtubs', ar: 'أحواض الاستحمام' }, description: { fr: 'Toutes les baignoires, piscines et spas du catalogue original.', en: 'Every bathtub, swimming pool and spa from the original catalogue.', ar: 'جميع أحواض الاستحمام والمسابح والسبا من الكتالوج الأصلي.' }, image: bathtubs.pages[0]!.url },
  { ...bathroom, slug: 'basins', pages: bathroom.pages.slice(0, 36), name: { fr: 'Vasques et lavabos', en: 'Ceramic basins', ar: 'المغاسل والأحواض' }, tagline: { fr: 'Vasques', en: 'Basins', ar: 'المغاسل' }, description: { fr: 'Les vasques en céramique du catalogue, avec dimensions et finitions d’origine.', en: 'The ceramic basins from the catalogue, with their original dimensions and finishes.', ar: 'أحواض السيراميك من الكتالوج بأبعادها وتشطيباتها الأصلية.' }, image: bathroom.pages[1]!.url },
  { ...bathroom, slug: 'toilets', pages: bathroom.pages.slice(36), name: { fr: 'WC et toilettes', en: 'Toilets', ar: 'المراحيض' }, tagline: { fr: 'WC et toilettes', en: 'Toilets', ar: 'المراحيض' }, description: { fr: 'Toilettes suspendues, au sol, siphons et réservoirs, dans leur présentation originale.', en: 'Wall-hung, floor-standing and siphon toilets plus tanks, in their original presentation.', ar: 'المراحيض المعلقة والأرضية والسيفون وخزانات المياه بتصميمها الأصلي.' }, image: bathroom.pages[36]!.url },
  { ...faucets, name: { fr: 'Robinetterie et douches', en: 'Faucets & showers', ar: 'الصنابير والدُش' }, tagline: { fr: 'Robinetterie et douches', en: 'Faucets & showers', ar: 'الصنابير والدُش' }, description: { fr: 'Tous les modèles, finitions et ensembles du catalogue.', en: 'Every model, finish and set from the catalogue.', ar: 'جميع الموديلات والتشطيبات والأطقم من الكتالوج.' }, image: faucets.pages[0]!.url },
  { ...fixtures, name: { fr: 'Équipements de salle de bains', en: 'Bathroom fixtures', ar: 'تجهيزات الحمّام' }, tagline: { fr: 'Équipements', en: 'Fixtures', ar: 'التجهيزات' }, description: { fr: 'Meubles, miroirs et équipements dans leur présentation originale.', en: 'Cabinets, mirrors and fixtures in their original presentation.', ar: 'الخزائن والمرايا والتجهيزات بتصميمها الأصلي.' }, image: fixtures.pages[0]!.url },
  { ...locks, name: { fr: 'Serrures intelligentes', en: 'Smart locks', ar: 'الأقفال الذكية' }, tagline: { fr: 'Serrures intelligentes', en: 'Smart locks', ar: 'الأقفال الذكية' }, description: { fr: 'Tous les modèles de serrures intelligentes. Prix sur demande.', en: 'Every smart lock model. Prices available on enquiry.', ar: 'جميع موديلات الأقفال الذكية. الأسعار عند الطلب.' }, image: locks.pages[0]!.url },
];
