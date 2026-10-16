import bathtubs from '@/assets/catalogues/bathtubs.json';
import bathroom from '@/assets/catalogues/bathroom.json';
import faucets from '@/assets/catalogues/faucets.json';
import fixtures from '@/assets/catalogues/fixtures.json';
import locks from '@/assets/catalogues/locks.json';
import lowbudget from '@/assets/catalogues/lowbudget.json';
import kitchens from '@/assets/catalogues/kitchens.json';
import enclosures from '@/assets/catalogues/enclosures.json';
import hmKitchens from '@/assets/catalogues/hm-kitchens.json';

export type Localized = { fr: string; en: string; ar: string };
export type CataloguePage = { url: string; width: number; height: number; text: string; convertedPrices: number; frUrl?: string; frText?: string; section?: Localized };
export type Category = { slug: string; name: Localized; tagline: Localized; description: Localized; image: string; pages: CataloguePage[]; pdf: string; pdfFr?: string; group?: string };

export const categories: Category[] = [
  { ...bathtubs, pages: [...bathtubs.pages.slice(0, 1), ...bathtubs.pages.slice(21, 38), ...bathtubs.pages.slice(61, 63), ...bathtubs.pages.slice(38, 61), ...bathtubs.pages.slice(63, 65), ...bathtubs.pages.slice(73, 74), ...bathtubs.pages.slice(81, 87), ...fixtures.pages.slice(47, 62), ...bathtubs.pages.slice(1, 21), ...bathtubs.pages.slice(74, 81)], name: { fr: 'Baignoires et spas', en: 'Bathtubs & spas', ar: 'أحواض الاستحمام والسبا' }, tagline: { fr: 'Baignoires', en: 'Bathtubs', ar: 'أحواض الاستحمام' }, description: { fr: 'Toutes les baignoires, piscines et spas du catalogue original. Les mitigeurs de baignoire sont dans l’onglet Robinets.', en: 'Every bathtub, swimming pool and spa from the original catalogue. Bathtub mixers are in the Taps tab.', ar: 'جميع أحواض الاستحمام والمسابح والسبا من الكتالوج الأصلي. خلاطات الأحواض في تبويب الصنابير.' }, image: bathtubs.pages[0]!.url },
  { ...bathroom, slug: 'basins', pages: [...bathroom.pages.slice(0, 37), fixtures.pages[2]!, ...fixtures.pages.slice(23, 47), ...fixtures.pages.slice(67, 79), ...fixtures.pages.slice(79, 83)], name: { fr: 'Vasques et lavabos', en: 'Basins', ar: 'المغاسل والأحواض' }, tagline: { fr: 'Vasques', en: 'Basins', ar: 'المغاسل' }, description: { fr: 'Toutes les vasques des catalogues : céramique, Corian, pierre de coulée, résine, inox et dalle de pierre, avec dimensions et finitions d’origine.', en: 'Every basin from the catalogues: ceramic, Corian, cast stone, resin, stainless steel and rock slab, with their original dimensions and finishes.', ar: 'جميع أحواض الغسل من الكتالوجات: سيراميك، كوريان، حجر مصبوب، راتنج، ستانلس ستيل وألواح صخرية، بأبعادها وتشطيباتها الأصلية.' }, image: bathroom.pages[1]!.url },
  { ...bathroom, slug: 'toilets', pages: bathroom.pages.slice(37), name: { fr: 'WC et toilettes', en: 'Toilets', ar: 'المراحيض' }, tagline: { fr: 'WC et toilettes', en: 'Toilets', ar: 'المراحيض' }, description: { fr: 'Toilettes suspendues, au sol, siphons et réservoirs, dans leur présentation originale.', en: 'Wall-hung, floor-standing and siphon toilets plus tanks, in their original presentation.', ar: 'المراحيض المعلقة والأرضية والسيفون وخزانات المياه بتصميمها الأصلي.' }, image: bathroom.pages[37]!.url },
  { ...faucets, pages: [...faucets.pages.slice(0, 17), ...faucets.pages.slice(55)], name: { fr: 'Douches', en: 'Showers', ar: 'الدُش' }, tagline: { fr: 'Douches', en: 'Showers', ar: 'الدُش' }, description: { fr: 'Les douches encastrées, pommes de douche et sèches-serviettes du catalogue. Les robinets sont dans l’onglet Robinets.', en: 'The in-wall showers, shower heads and electric towel racks from the catalogue. Taps are in the Taps tab.', ar: 'دُش الحائط ورؤوس الدُش ومجففات المناشف الكهربائية من الكتالوج. الصنابير في تبويب الصنابير.' }, image: faucets.pages[0]!.url },
  { ...faucets, slug: 'taps', pages: [...faucets.pages.slice(17, 55), ...fixtures.pages.slice(62, 67), ...bathtubs.pages.slice(65, 73)], name: { fr: 'Robinets', en: 'Taps', ar: 'الصنابير' }, tagline: { fr: 'Robinets', en: 'Taps', ar: 'الصنابير' }, description: { fr: 'Les robinets muraux, de lavabo et de cuisine du catalogue.', en: 'The wall-in, basin and kitchen taps from the catalogue.', ar: 'صنابير الحائط والمغاسل والمطبخ من الكتالوج.' }, image: faucets.pages[17]!.url },
  { ...fixtures, pages: [...fixtures.pages.slice(0, 2), ...fixtures.pages.slice(3, 23), fixtures.pages[83]!], name: { fr: 'Meubles', en: 'Cabinets', ar: 'الخزائن' }, tagline: { fr: 'Meubles', en: 'Cabinets', ar: 'الخزائن' }, description: { fr: 'Meubles et miroirs du catalogue, dans leur présentation originale. Les vasques, baignoires et robinets ont leurs propres onglets.', en: 'Cabinets and mirrors from the catalogue, in their original presentation. Basins, bathtubs and taps have their own tabs.', ar: 'الخزائن والمرايا من الكتالوج بتصميمها الأصلي. المغاسل وأحواض الاستحمام والصنابير لها تبويباتها الخاصة.' }, image: fixtures.pages[0]!.url },
  { ...locks, name: { fr: 'Serrures intelligentes', en: 'Smart locks', ar: 'الأقفال الذكية' }, tagline: { fr: 'Serrures intelligentes', en: 'Smart locks', ar: 'الأقفال الذكية' }, description: { fr: 'Tous les modèles de serrures intelligentes.', en: 'Every smart lock model.', ar: 'جميع موديلات الأقفال الذكية.' }, image: locks.pages[0]!.url },
  { ...hmKitchens, name: { fr: 'Cuisines', en: 'Kitchens', ar: 'المطابخ' }, tagline: { fr: 'Cuisines', en: 'Kitchens', ar: 'المطابخ' }, description: { fr: 'Aménagements et quincaillerie de cuisine et dressing, classés par section.', en: 'Kitchen and wardrobe fittings and hardware, organised by section.', ar: 'تجهيزات وإكسسوارات المطبخ وخزائن الملابس مرتبة حسب القسم.' }, image: hmKitchens.pages[0]!.url },
];

export const LOW_BUDGET = 'low-budget';
const L = (fr: string, en: string, ar: string): Localized => ({ fr, en, ar });
const lb = lowbudget;
export const lowBudgetCategories: Category[] = [
  { ...lb.cabinets, slug: 'lb-cabinets', group: LOW_BUDGET, name: L('Meubles de salle de bains', 'Bathroom cabinets', 'خزائن الحمّام'), tagline: L('Meubles', 'Cabinets', 'الخزائن'), description: L('Meubles vasque suspendus avec miroir LED, de 60 à 100 cm.', 'Wall-hung vanity cabinets with LED mirror, 60 to 100 cm.', 'خزائن معلقة مع مرآة LED، من 60 إلى 100 سم.'), image: lb.cabinets.pages[0]!.url },
  { ...enclosures, group: LOW_BUDGET, name: L('Cabines de douche', 'Shower enclosures', 'كبائن الاستحمام'), tagline: L('Cabines de douche', 'Shower enclosures', 'كبائن الاستحمام'), description: L('Cabines en verre trempé, cadre aluminium et receveur ABS, avec prix en EUR et MAD.', 'Tempered-glass enclosures with aluminium frame and ABS tray, with prices in EUR and MAD.', 'كبائن زجاج مقسّى بإطار ألمنيوم وقاعدة ABS، مع الأسعار باليورو والدرهم.'), image: enclosures.pages[0]!.url },
  { ...lb.showers, slug: 'lb-showers', group: LOW_BUDGET, name: L('Colonnes et ensembles de douche', 'Shower sets', 'أطقم الدُش'), tagline: L('Douches', 'Showers', 'الدُش'), description: L('Ensembles de douche encastrés avec pomme de pluie et mitigeur.', 'Concealed shower sets with rain head and mixer.', 'أطقم دُش مدفونة برأس مطري وخلاط.'), image: lb.showers.pages[0]!.url },
  { ...lb.toilets, slug: 'lb-toilets', group: LOW_BUDGET, name: L('WC et toilettes', 'Toilets', 'المراحيض'), tagline: L('WC', 'Toilets', 'المراحيض'), description: L('Toilettes suspendues et ensembles avec bâti-support.', 'Wall-hung toilets and concealed-cistern sets.', 'مراحيض معلقة وأطقم بخزان مخفي.'), image: lb.toilets.pages[0]!.url },
  { ...lb.taps, slug: 'lb-taps', group: LOW_BUDGET, name: L('Robinets', 'Water taps', 'الصنابير'), tagline: L('Robinets', 'Taps', 'الصنابير'), description: L('Mitigeurs de lavabo et de cuisine à petit prix.', 'Affordable basin and kitchen taps.', 'خلاطات أحواض ومطابخ بأسعار مناسبة.'), image: lb.taps.pages[0]!.url },
  { ...kitchens, group: LOW_BUDGET, name: L('Cuisines', 'Kitchens', 'المطابخ'), tagline: L('Cuisines', 'Kitchens', 'المطابخ'), description: L('Meubles de cuisine en inox et plans en quartz.', 'Stainless steel kitchen cabinets and quartz countertops.', 'خزائن مطبخ من الستانلس ستيل وأسطح كوارتز.'), image: kitchens.pages[0]!.url },
];
export const lowBudgetGroup: Category = {
  slug: LOW_BUDGET, pdf: '', pages: lowBudgetCategories.flatMap(c => c.pages),
  name: L('Sanitaire petit budget', 'Low Budget Sanitary', 'الأدوات الصحية الاقتصادية'),
  tagline: L('Sanitaire petit budget', 'Low Budget Sanitary', 'الأدوات الصحية الاقتصادية'),
  description: L('Meubles, cabines de douche, douches, WC et robinets.', 'Cabinets, shower enclosures, showers, toilets and taps.', 'خزائن وكبائن استحمام ودُش ومراحيض وصنابير.'),
  image: lb.cabinets.pages[0]!.url,
};
export const topLevelCategories: Category[] = [...categories, lowBudgetGroup];
export const allCategories: Category[] = [...categories, ...lowBudgetCategories];
