import bathtubs from "@/assets/cat-bathtubs.jpg";
import faucets from "@/assets/cat-faucets.jpg";
import showers from "@/assets/cat-showers.jpg";
import fixtures from "@/assets/cat-fixtures.jpg";
import locks from "@/assets/cat-locks.jpg";

export type Category = {
  slug: string;
  name: { fr: string; ar: string };
  tagline: { fr: string; ar: string };
  description: { fr: string; ar: string };
  image: string;
};

export const categories: Category[] = [
  {
    slug: "bathtubs",
    name: { fr: "1000 modèles de baignoires", ar: "1000 تصميم لأحواض الاستحمام" },
    tagline: { fr: "Baignoires", ar: "أحواض الاستحمام" },
    description: { fr: "Plongez dans notre vaste collection de baignoires, où style et confort se rencontrent dans plus de mille modèles adaptés à chaque espace.", ar: "اكتشفوا مجموعتنا الواسعة من أحواض الاستحمام، حيث يلتقي الأناقة والراحة في أكثر من ألف تصميم يناسب كل مساحة." },
    image: bathtubs,
  },
  {
    slug: "faucets",
    name: { fr: "Robinetterie et douche", ar: "الصنابير والدُش" },
    tagline: { fr: "Robinetterie", ar: "الصنابير" },
    description: { fr: "Sublimez votre expérience de l’eau avec des robinets de précision qui allient performance, durabilité et design contemporain.", ar: "ارتقوا بتجربة المياه مع صنابير مصممة بدقة تجمع بين الأداء والمتانة والتصميم العصري." },
    image: faucets,
  },
  {
    slug: "showers",
    name: { fr: "Douches", ar: "الدُش" },
    tagline: { fr: "Douches", ar: "الدُش" },
    description: { fr: "Ciels de pluie, colonnes et ensembles thermostatiques conçus pour un débit généreux et silencieux.", ar: "رؤوس مطرية وأعمدة وأطقم حرارية مصممة لتدفق هادئ وغزير." },
    image: showers,
  },
  {
    slug: "fixtures",
    name: { fr: "Équipements de salle de bains", ar: "تجهيزات الحمّام" },
    tagline: { fr: "Équipements", ar: "التجهيزات" },
    description: { fr: "Des équipements haut de gamme où forme et fonction s’accordent harmonieusement dans chaque recoin de votre espace.", ar: "تجهيزات فاخرة تمزج بسلاسة بين الشكل والوظيفة في كل زاوية من مساحتكم." },
    image: fixtures,
  },
  {
    slug: "locks",
    name: { fr: "Serrures intelligentes à empreinte", ar: "أقفال ذكية بالبصمة" },
    tagline: { fr: "Serrures intelligentes", ar: "الأقفال الذكية" },
    description: { fr: "Des serrures biométriques de pointe offrant sécurité avancée, design épuré et accès sans clé.", ar: "أقفال بصمة متطورة توفر أماناً متقدماً وتصميماً أنيقاً ودخولاً سهلاً دون مفتاح." },
    image: locks,
  },
];

export type Product = {
  id: string;
  name: { fr: string; ar: string };
  category: string;
  material: { fr: string; ar: string };
  /** Supplier price in Chinese yuan — displayed converted to dirham. */
  priceCny: number;
  image: string;
};

export const products: Product[] = [
  { id: "lx-bt-01", name: { fr: "Baignoire Atlas Travertin", ar: "حوض أطلس من الترافرتين" }, category: "bathtubs", material: { fr: "Travertin massif, 170 cm", ar: "ترافرتين صلب، 170 سم" }, priceCny: 18600, image: bathtubs },
  { id: "lx-bt-02", name: { fr: "Baignoire ovale Médina", ar: "حوض ميدينا البيضاوي" }, category: "bathtubs", material: { fr: "Résine minérale, 160 cm", ar: "راتنج حجري، 160 سم" }, priceCny: 9400, image: bathtubs },
  { id: "lx-bt-03", name: { fr: "Baignoire îlot Zellige", ar: "حوض زليج مستقل" }, category: "bathtubs", material: { fr: "Composite acrylique mat, 180 cm", ar: "أكريليك مركب مطفي، 180 سم" }, priceCny: 6800, image: bathtubs },
  { id: "lx-fa-01", name: { fr: "Mitigeur vasque Guéliz", ar: "خلاط حوض كليز" }, category: "faucets", material: { fr: "Laiton brossé", ar: "نحاس مصقول" }, priceCny: 1280, image: faucets },
  { id: "lx-fa-02", name: { fr: "Mitigeur haut Sahara", ar: "خلاط صحارى المرتفع" }, category: "faucets", material: { fr: "Laiton brossé, hauteur vasque", ar: "نحاس مصقول، ارتفاع مناسب للحوض" }, priceCny: 1690, image: faucets },
  { id: "lx-fa-03", name: { fr: "Mitigeur mural Riad", ar: "خلاط رياض الجداري" }, category: "faucets", material: { fr: "Laiton noir mat", ar: "نحاس أسود مطفي" }, priceCny: 2150, image: faucets },
  { id: "lx-sh-01", name: { fr: "Colonne pluie Cascade", ar: "عمود دُش كاسكيد المطري" }, category: "showers", material: { fr: "Inox noir mat, thermostatique", ar: "فولاذ مقاوم للصدأ أسود مطفي، حراري" }, priceCny: 3450, image: showers },
  { id: "lx-sh-02", name: { fr: "Douche plafond Océan", ar: "دُش أوشن السقفي" }, category: "showers", material: { fr: "Laiton encastré, tête 400 mm", ar: "نحاس مدمج، رأس 400 مم" }, priceCny: 5200, image: showers },
  { id: "lx-fx-01", name: { fr: "Vasque suspendue Nomade", ar: "حوض نوماد المعلق" }, category: "fixtures", material: { fr: "Céramique fine", ar: "سيراميك فاخر" }, priceCny: 2400, image: fixtures },
  { id: "lx-fx-02", name: { fr: "Ensemble accessoires Essaouira", ar: "طقم إكسسوارات الصويرة" }, category: "fixtures", material: { fr: "Acier brossé, 5 pièces", ar: "فولاذ مصقول، 5 قطع" }, priceCny: 860, image: fixtures },
  { id: "lx-lk-01", name: { fr: "Serrure biométrique Sentinel", ar: "قفل سنتينل بالبصمة" }, category: "locks", material: { fr: "Alliage d’aluminium, appli + code", ar: "سبيكة ألمنيوم، تطبيق ورمز" }, priceCny: 1980, image: locks },
  { id: "lx-lk-02", name: { fr: "Serrure intelligente Sentinel Pro", ar: "قفل سنتينل برو الذكي" }, category: "locks", material: { fr: "Alliage de zinc, visage + empreinte", ar: "سبيكة زنك، وجه وبصمة" }, priceCny: 3300, image: locks },
];
