import bathtubs from "@/assets/cat-bathtubs.jpg";
import faucets from "@/assets/cat-faucets.jpg";
import showers from "@/assets/cat-showers.jpg";
import fixtures from "@/assets/cat-fixtures.jpg";
import locks from "@/assets/cat-locks.jpg";

export type Category = {
  slug: string;
  name: { fr: string; ar: string; en: string };
  tagline: { fr: string; ar: string; en: string };
  description: { fr: string; ar: string; en: string };
  image: string;
};

export const categories: Category[] = [
  {
    slug: "bathtubs",
    name: { fr: "1000 modèles de baignoires", ar: "1000 تصميم لأحواض الاستحمام", en: "1000 bathtub designs" },
    tagline: { fr: "Baignoires", ar: "أحواض الاستحمام", en: "Bathtubs" },
    description: { fr: "Plongez dans notre vaste collection de baignoires, où style et confort se rencontrent dans plus de mille modèles adaptés à chaque espace.", ar: "اكتشفوا مجموعتنا الواسعة من أحواض الاستحمام، حيث يلتقي الأناقة والراحة في أكثر من ألف تصميم يناسب كل مساحة.", en: "Dive into our extensive bathtub collection, where style meets comfort in over a thousand designs to suit every space." },
    image: bathtubs,
  },
  {
    slug: "faucets",
    name: { fr: "Robinetterie et douche", ar: "الصنابير والدُش", en: "Faucets & showers" },
    tagline: { fr: "Robinetterie", ar: "الصنابير", en: "Faucets" },
    description: { fr: "Sublimez votre expérience de l’eau avec des robinets de précision qui allient performance, durabilité et design contemporain.", ar: "ارتقوا بتجربة المياه مع صنابير مصممة بدقة تجمع بين الأداء والمتانة والتصميم العصري.", en: "Elevate your water experience with precision faucets that combine performance, durability and contemporary design." },
    image: faucets,
  },
  {
    slug: "showers",
    name: { fr: "Douches", ar: "الدُش", en: "Showers" },
    tagline: { fr: "Douches", ar: "الدُش", en: "Showers" },
    description: { fr: "Ciels de pluie, colonnes et ensembles thermostatiques conçus pour un débit généreux et silencieux.", ar: "رؤوس مطرية وأعمدة وأطقم حرارية مصممة لتدفق هادئ وغزير.", en: "Rain heads, shower columns and thermostatic sets designed for generous, quiet flow." },
    image: showers,
  },
  {
    slug: "fixtures",
    name: { fr: "Équipements de salle de bains", ar: "تجهيزات الحمّام", en: "Bathroom fixtures" },
    tagline: { fr: "Équipements", ar: "التجهيزات", en: "Fixtures" },
    description: { fr: "Des équipements haut de gamme où forme et fonction s’accordent harmonieusement dans chaque recoin de votre espace.", ar: "تجهيزات فاخرة تمزج بسلاسة بين الشكل والوظيفة في كل زاوية من مساحتكم.", en: "Premium fixtures where form and function blend seamlessly in every corner of your space." },
    image: fixtures,
  },
  {
    slug: "locks",
    name: { fr: "Serrures intelligentes à empreinte", ar: "أقفال ذكية بالبصمة", en: "Smart fingerprint locks" },
    tagline: { fr: "Serrures intelligentes", ar: "الأقفال الذكية", en: "Smart locks" },
    description: { fr: "Des serrures biométriques de pointe offrant sécurité avancée, design épuré et accès sans clé.", ar: "أقفال بصمة متطورة توفر أماناً متقدماً وتصميماً أنيقاً ودخولاً سهلاً دون مفتاح.", en: "Advanced biometric locks offering strong security, clean design and keyless access." },
    image: locks,
  },
];

export type Product = {
  id: string;
  name: { fr: string; ar: string; en: string };
  category: string;
  material: { fr: string; ar: string; en: string };
  /** Supplier price in Chinese yuan — displayed converted to dirham. */
  priceCny: number;
  image: string;
};

export const products: Product[] = [
  { id: "lx-bt-01", name: { fr: "Baignoire Atlas Travertin", ar: "حوض أطلس من الترافرتين", en: "Atlas Travertine Bathtub" }, category: "bathtubs", material: { fr: "Travertin massif, 170 cm", ar: "ترافرتين صلب، 170 سم", en: "Solid travertine, 170 cm" }, priceCny: 18600, image: bathtubs },
  { id: "lx-bt-02", name: { fr: "Baignoire ovale Médina", ar: "حوض ميدينا البيضاوي", en: "Medina Oval Bathtub" }, category: "bathtubs", material: { fr: "Résine minérale, 160 cm", ar: "راتنج حجري، 160 سم", en: "Stone resin, 160 cm" }, priceCny: 9400, image: bathtubs },
  { id: "lx-bt-03", name: { fr: "Baignoire îlot Zellige", ar: "حوض زليج مستقل", en: "Zellige Freestanding Bathtub" }, category: "bathtubs", material: { fr: "Composite acrylique mat, 180 cm", ar: "أكريليك مركب مطفي، 180 سم", en: "Matte acrylic composite, 180 cm" }, priceCny: 6800, image: bathtubs },
  { id: "lx-fa-01", name: { fr: "Mitigeur vasque Guéliz", ar: "خلاط حوض كليز", en: "Gueliz Basin Mixer" }, category: "faucets", material: { fr: "Laiton brossé", ar: "نحاس مصقول", en: "Brushed brass" }, priceCny: 1280, image: faucets },
  { id: "lx-fa-02", name: { fr: "Mitigeur haut Sahara", ar: "خلاط صحارى المرتفع", en: "Sahara Tall Mixer" }, category: "faucets", material: { fr: "Laiton brossé, hauteur vasque", ar: "نحاس مصقول، ارتفاع مناسب للحوض", en: "Brushed brass, vessel height" }, priceCny: 1690, image: faucets },
  { id: "lx-fa-03", name: { fr: "Mitigeur mural Riad", ar: "خلاط رياض الجداري", en: "Riad Wall Mixer" }, category: "faucets", material: { fr: "Laiton noir mat", ar: "نحاس أسود مطفي", en: "Matte black brass" }, priceCny: 2150, image: faucets },
  { id: "lx-sh-01", name: { fr: "Colonne pluie Cascade", ar: "عمود دُش كاسكيد المطري", en: "Cascade Rain Column" }, category: "showers", material: { fr: "Inox noir mat, thermostatique", ar: "فولاذ مقاوم للصدأ أسود مطفي، حراري", en: "Matte black stainless steel, thermostatic" }, priceCny: 3450, image: showers },
  { id: "lx-sh-02", name: { fr: "Douche plafond Océan", ar: "دُش أوشن السقفي", en: "Ocean Ceiling Shower" }, category: "showers", material: { fr: "Laiton encastré, tête 400 mm", ar: "نحاس مدمج، رأس 400 مم", en: "Concealed brass, 400 mm head" }, priceCny: 5200, image: showers },
  { id: "lx-fx-01", name: { fr: "Vasque suspendue Nomade", ar: "حوض نوماد المعلق", en: "Nomade Wall-Hung Basin" }, category: "fixtures", material: { fr: "Céramique fine", ar: "سيراميك فاخر", en: "Fine ceramic" }, priceCny: 2400, image: fixtures },
  { id: "lx-fx-02", name: { fr: "Ensemble accessoires Essaouira", ar: "طقم إكسسوارات الصويرة", en: "Essaouira Accessory Set" }, category: "fixtures", material: { fr: "Acier brossé, 5 pièces", ar: "فولاذ مصقول، 5 قطع", en: "Brushed steel, 5 pieces" }, priceCny: 860, image: fixtures },
  { id: "lx-lk-01", name: { fr: "Serrure biométrique Sentinel", ar: "قفل سنتينل بالبصمة", en: "Sentinel Biometric Lock" }, category: "locks", material: { fr: "Alliage d’aluminium, appli + code", ar: "سبيكة ألمنيوم، تطبيق ورمز", en: "Aluminium alloy, app + code" }, priceCny: 1980, image: locks },
  { id: "lx-lk-02", name: { fr: "Serrure intelligente Sentinel Pro", ar: "قفل سنتينل برو الذكي", en: "Sentinel Pro Smart Lock" }, category: "locks", material: { fr: "Alliage de zinc, visage + empreinte", ar: "سبيكة زنك، وجه وبصمة", en: "Zinc alloy, face + fingerprint" }, priceCny: 3300, image: locks },
];
