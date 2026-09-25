import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "fr" | "ar";

type Messages = {
  nav: { about: string; products: string; contact: string };
  brandLine: [string, string, string];
  footer: { where: string; contact: string; prices: string };
  home: {
    hero: string;
    collectionCta: string;
    introTitle: string;
    introBody: string;
    discover: string;
    collections: string;
    viewProducts: string;
  };
  products: {
    catalogue: string;
    title: string;
    intro: string;
    all: string;
    enquire: string;
    enquirySubject: string;
  };
  about: { label: string; title: string; paragraphs: [string, string, string] };
  contact: { pretitle: string; title: string; email: string; showroom: string; pricing: string; pricingBody: string };
  errors: { notFound: string; notFoundBody: string; load: string; loadBody: string; home: string; retry: string };
};

const messages: Record<Language, Messages> = {
  fr: {
    nav: { about: "À propos", products: "Produits", contact: "Contact" },
    brandLine: ["Pour votre maison.", "Pour votre confort.", "Pour vous."],
    footer: {
      where: "Où nous trouver",
      contact: "Nous contacter",
      prices: "Tous les prix sont affichés en dirham marocain (MAD).",
    },
    home: {
      hero: "Un savoir-faire intemporel. Un design éprouvé. Affirmez un style qui traverse le temps avec Luxora",
      collectionCta: "Voir la collection",
      introTitle: "Nous défendons un design fait pour durer. Pour votre maison. Pour vous.",
      introBody: "Chez LUXORA, nous pensons que chaque détail compte. C’est pourquoi nous proposons une sélection soignée de baignoires, robinets, douches, équipements et accessoires qui allient design intemporel et qualité durable. Nos produits embellissent votre maison tout en restant fonctionnels, aujourd’hui, demain et pour longtemps.",
      discover: "Découvrez nos",
      collections: "Collections",
      viewProducts: "Voir les produits",
    },
    products: {
      catalogue: "Catalogue",
      title: "Tout pour votre salle de bains",
      intro: "Tous les prix sont affichés en dirham marocain, après conversion des tarifs de nos fournisseurs en yuans. Contactez-nous pour les tarifs en volume, les délais et l’installation.",
      all: "Tous",
      enquire: "Demander un devis",
      enquirySubject: "Demande de renseignements",
    },
    about: {
      label: "À propos",
      title: "Nous défendons un design fait pour durer. Pour votre maison. Pour vous.",
      paragraphs: [
        "Chez LUXORA, nous pensons que chaque détail compte. Nous proposons une sélection soignée de baignoires, robinets, douches, équipements et accessoires qui allient design intemporel et qualité durable.",
        "Nous travaillons directement avec nos partenaires fabricants afin de préserver la qualité et de proposer des prix justes. Les devis fournisseurs sont établis en yuans chinois ; tous les prix de ce site sont convertis et affichés en dirham marocain.",
        "Visitez notre showroom à Marrakech Guéliz pour découvrir les matières en personne : pierre, laiton brossé, acier noir mat et céramique fine.",
      ],
    },
    contact: {
      pretitle: "Prenons",
      title: "Contact",
      email: "E-mail",
      showroom: "Showroom",
      pricing: "Tarifs",
      pricingBody: "Tous les prix de ce site sont affichés en dirham marocain. Demandez-nous un devis complet incluant la livraison et l’installation partout au Maroc.",
    },
    errors: {
      notFound: "Page introuvable",
      notFoundBody: "La page que vous recherchez n’existe pas ou a été déplacée.",
      load: "Cette page n’a pas pu être chargée",
      loadBody: "Une erreur s’est produite. Vous pouvez réessayer ou revenir à l’accueil.",
      home: "Accueil",
      retry: "Réessayer",
    },
  },
  ar: {
    nav: { about: "من نحن", products: "المنتجات", contact: "اتصل بنا" },
    brandLine: ["لمنزلك.", "لراحتك.", "لك أنت."],
    footer: {
      where: "موقعنا",
      contact: "اتصل بنا",
      prices: "جميع الأسعار معروضة بالدرهم المغربي (MAD).",
    },
    home: {
      hero: "حِرَفية عريقة. تصميم أثبت جودته. اصنع بصمة تدوم مدى الحياة مع لوكسورا",
      collectionCta: "اكتشف المجموعة",
      introTitle: "نؤمن بتصميم يدوم طويلاً. لمنزلك. لك أنت.",
      introBody: "في LUXORA، نؤمن بأن كل تفصيل مهم. لذلك نقدم تشكيلة مختارة بعناية من أحواض الاستحمام والصنابير والدُش والتجهيزات والإكسسوارات التي تجمع بين التصميم الخالد والجودة الدائمة. صُممت منتجاتنا لتضيف الجمال والعملية إلى منزلك اليوم وغداً ولسنوات طويلة.",
      discover: "اكتشف",
      collections: "مجموعاتنا",
      viewProducts: "عرض المنتجات",
    },
    products: {
      catalogue: "الكتالوج",
      title: "كل ما تحتاجه لحمّامك",
      intro: "جميع الأسعار معروضة بالدرهم المغربي بعد تحويل أسعار موردينا من اليوان. اتصل بنا لمعرفة أسعار الكميات ومواعيد التسليم والتركيب.",
      all: "الكل",
      enquire: "اطلب عرضاً",
      enquirySubject: "استفسار",
    },
    about: {
      label: "من نحن",
      title: "نؤمن بتصميم يدوم طويلاً. لمنزلك. لك أنت.",
      paragraphs: [
        "في LUXORA، نؤمن بأن كل تفصيل مهم. نقدم تشكيلة مختارة بعناية من أحواض الاستحمام والصنابير والدُش والتجهيزات والإكسسوارات التي تجمع بين التصميم الخالد والجودة الدائمة.",
        "نعمل مباشرة مع شركائنا المصنّعين للحفاظ على الجودة وتقديم أسعار عادلة. تصدر عروض الموردين باليوان الصيني، بينما تُحوّل جميع الأسعار في هذا الموقع وتُعرض بالدرهم المغربي.",
        "زوروا معرضنا في مراكش كليز لاكتشاف الخامات عن قرب: الحجر والنحاس المصقول والفولاذ الأسود المطفي والسيراميك الفاخر.",
      ],
    },
    contact: {
      pretitle: "يسعدنا",
      title: "تواصلكم معنا",
      email: "البريد الإلكتروني",
      showroom: "المعرض",
      pricing: "الأسعار",
      pricingBody: "جميع الأسعار في هذا الموقع معروضة بالدرهم المغربي. اطلبوا منا عرضاً شاملاً يتضمن التوصيل والتركيب في جميع أنحاء المغرب.",
    },
    errors: {
      notFound: "الصفحة غير موجودة",
      notFoundBody: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      load: "تعذر تحميل هذه الصفحة",
      loadBody: "حدث خطأ. يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.",
      home: "الرئيسية",
      retry: "حاول مرة أخرى",
    },
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Messages;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem("luxora-language");
    if (saved === "fr" || saved === "ar") setLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("luxora-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: messages[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}