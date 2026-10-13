import bathtubs from '@/assets/catalogues/bathtubs.json';
import bathroom from '@/assets/catalogues/bathroom.json';
import faucets from '@/assets/catalogues/faucets.json';
import fixtures from '@/assets/catalogues/fixtures.json';
import locks from '@/assets/catalogues/locks.json';
import lowbudget from '@/assets/catalogues/lowbudget.json';

export type Localized = { fr: string; en: string; ar: string };
export type CataloguePage = { url: string; width: number; height: number; text: string; convertedPrices: number };
export type Category = { slug: string; name: Localized; tagline: Localized; description: Localized; image: string; pages: CataloguePage[]; pdf: string; group?: string };

export const categories: Category[] = [
  { ...bathtubs, name: { fr: 'Baignoires et spas', en: 'Bathtubs & spas', ar: 'أحواض الاستحمام والسبا' }, tagline: { fr: 'Baignoires', en: 'Bathtubs', ar: 'أحواض الاستحمام' }, description: { fr: 'Toutes les baignoires, piscines et spas du catalogue original.', en: 'Every bathtub, swimming pool and spa from the original catalogue.', ar: 'جميع أحواض الاستحمام والمسابح والسبا من الكتالوج الأصلي.' }, image: bathtubs.pages[0]!.url },
  { ...bathroom, slug: 'basins', pages: bathroom.pages.slice(0, 37), name: { fr: 'Vasques et lavabos', en: 'Ceramic basins', ar: 'المغاسل والأحواض' }, tagline: { fr: 'Vasques', en: 'Basins', ar: 'المغاسل' }, description: { fr: 'Les vasques en céramique du catalogue, avec dimensions et finitions d’origine.', en: 'The ceramic basins from the catalogue, with their original dimensions and finishes.', ar: 'أحواض السيراميك من الكتالوج بأبعادها وتشطيباتها الأصلية.' }, image: bathroom.pages[1]!.url },
  { ...bathroom, slug: 'toilets', pages: bathroom.pages.slice(37), name: { fr: 'WC et toilettes', en: 'Toilets', ar: 'المراحيض' }, tagline: { fr: 'WC et toilettes', en: 'Toilets', ar: 'المراحيض' }, description: { fr: 'Toilettes suspendues, au sol, siphons et réservoirs, dans leur présentation originale.', en: 'Wall-hung, floor-standing and siphon toilets plus tanks, in their original presentation.', ar: 'المراحيض المعلقة والأرضية والسيفون وخزانات المياه بتصميمها الأصلي.' }, image: bathroom.pages[37]!.url },
  { ...faucets, name: { fr: 'Robinetterie et douches', en: 'Faucets & showers', ar: 'الصنابير والدُش' }, tagline: { fr: 'Robinetterie et douches', en: 'Faucets & showers', ar: 'الصنابير والدُش' }, description: { fr: 'Tous les modèles, finitions et ensembles du catalogue.', en: 'Every model, finish and set from the catalogue.', ar: 'جميع الموديلات والتشطيبات والأطقم من الكتالوج.' }, image: faucets.pages[0]!.url },
  { ...fixtures, name: { fr: 'Équipements de salle de bains', en: 'Bathroom fixtures', ar: 'تجهيزات الحمّام' }, tagline: { fr: 'Équipements', en: 'Fixtures', ar: 'التجهيزات' }, description: { fr: 'Meubles, miroirs et équipements dans leur présentation originale.', en: 'Cabinets, mirrors and fixtures in their original presentation.', ar: 'الخزائن والمرايا والتجهيزات بتصميمها الأصلي.' }, image: fixtures.pages[0]!.url },
  { ...locks, name: { fr: 'Serrures intelligentes', en: 'Smart locks', ar: 'الأقفال الذكية' }, tagline: { fr: 'Serrures intelligentes', en: 'Smart locks', ar: 'الأقفال الذكية' }, description: { fr: 'Tous les modèles de serrures intelligentes. Prix sur demande.', en: 'Every smart lock model. Prices available on enquiry.', ar: 'جميع موديلات الأقفال الذكية. الأسعار عند الطلب.' }, image: locks.pages[0]!.url },
];

export const LOW_BUDGET = 'low-budget';
const L = (fr: string, en: string, ar: string): Localized => ({ fr, en, ar });
const lb = lowbudget;
export const lowBudgetCategories: Category[] = [
  { ...lb.cabinets, slug: 'lb-cabinets', group: LOW_BUDGET, name: L('Meubles de salle de bains', 'Bathroom cabinets', 'خزائن الحمّام'), tagline: L('Meubles', 'Cabinets', 'الخزائن'), description: L('Meubles vasque suspendus avec miroir LED, de 60 à 100 cm.', 'Wall-hung vanity cabinets with LED mirror, 60 to 100 cm.', 'خزائن معلقة مع مرآة LED، من 60 إلى 100 سم.'), image: lb.cabinets.pages[0]!.url },
  { ...lb.enclosures, slug: 'lb-enclosures', group: LOW_BUDGET, name: L('Cabines de douche', 'Shower enclosures', 'كبائن الاستحمام'), tagline: L('Cabines de douche', 'Shower enclosures', 'كبائن الاستحمام'), description: L('Portes coulissantes en verre trempé, cadre aluminium et receveur ABS.', 'Sliding tempered-glass doors with aluminium frame and ABS tray.', 'أبواب زجاج مقسّى منزلقة بإطار ألمنيوم وقاعدة ABS.'), image: lb.enclosures.pages[0]!.url },
  { ...lb.showers, slug: 'lb-showers', group: LOW_BUDGET, name: L('Colonnes et ensembles de douche', 'Shower sets', 'أطقم الدُش'), tagline: L('Douches', 'Showers', 'الدُش'), description: L('Ensembles de douche encastrés avec pomme de pluie et mitigeur.', 'Concealed shower sets with rain head and mixer.', 'أطقم دُش مدفونة برأس مطري وخلاط.'), image: lb.showers.pages[0]!.url },
  { ...lb.toilets, slug: 'lb-toilets', group: LOW_BUDGET, name: L('WC et toilettes', 'Toilets', 'المراحيض'), tagline: L('WC', 'Toilets', 'المراحيض'), description: L('Toilettes suspendues et ensembles avec bâti-support.', 'Wall-hung toilets and concealed-cistern sets.', 'مراحيض معلقة وأطقم بخزان مخفي.'), image: lb.toilets.pages[0]!.url },
  { ...lb.taps, slug: 'lb-taps', group: LOW_BUDGET, name: L('Robinets', 'Water taps', 'الصنابير'), tagline: L('Robinets', 'Taps', 'الصنابير'), description: L('Mitigeurs de lavabo et de cuisine à petit prix.', 'Affordable basin and kitchen taps.', 'خلاطات أحواض ومطابخ بأسعار مناسبة.'), image: lb.taps.pages[0]!.url },
];
export const lowBudgetGroup: Category = {
  slug: LOW_BUDGET, pdf: '', pages: lowBudgetCategories.flatMap(c => c.pages),
  name: L('Sanitaire petit budget', 'Low Budget Sanitary', 'الأدوات الصحية الاقتصادية'),
  tagline: L('Sanitaire petit budget', 'Low Budget Sanitary', 'الأدوات الصحية الاقتصادية'),
  description: L('Meubles, cabines de douche, douches, WC et robinets à prix économiques, en MAD et EUR.', 'Cabinets, shower enclosures, showers, toilets and taps at budget prices, in MAD and EUR.', 'خزائن وكبائن استحمام ودُش ومراحيض وصنابير بأسعار اقتصادية، بالدرهم واليورو.'),
  image: lb.cabinets.pages[0]!.url,
};
export const topLevelCategories: Category[] = [...categories, lowBudgetGroup];
export const allCategories: Category[] = [...categories, ...lowBudgetCategories];
