import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/hero-stone.jpg";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À propos — LUXORA Marrakech" },
      {
        name: "description",
        content:
          "Luxora sélectionne baignoires, robinetterie, douches et équipements durables pour les maisons marocaines.",
      },
      { property: "og:title", content: "À propos — LUXORA" },
      {
        property: "og:description",
        content: "Un design fait pour durer, sélectionné pour les maisons marocaines depuis notre showroom à Marrakech.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { language, t } = useLanguage();
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow">{t.about.label}</p>
      <h1 className="mt-2 max-w-3xl text-4xl leading-tight font-medium md:text-5xl">
        {t.about.title}
      </h1>

      <div className="mt-14 grid gap-14 md:grid-cols-2">
        <img
          src={heroImage}
          alt={language === "fr" ? "Vasques en pierre et baignoire en travertin" : language === "en" ? "Stone basins and a travertine bathtub" : "أحواض حجرية وحوض استحمام من الترافرتين"}
          loading="lazy"
          width={1920}
          height={1088}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          {t.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </div>
  );
}
