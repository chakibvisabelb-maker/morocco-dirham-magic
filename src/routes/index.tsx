import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-stone.jpg";
import { categories } from "@/lib/products";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUXORA — Baignoires, robinetterie et équipements à Marrakech" },
      {
        name: "description",
        content:
          "Baignoires, robinetterie, douches, équipements et serrures intelligentes à Marrakech. Prix en dirham marocain.",
      },
      { property: "og:title", content: "LUXORA — Pour votre maison. Pour votre confort. Pour vous." },
      {
        property: "og:description",
        content:
          "Une sélection soignée de baignoires, robinetterie, douches et équipements, en dirham marocain.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { language, t } = useLanguage();
  return (
    <>
      <section className="relative">
        <img
          src={heroImage}
          alt={language === "fr" ? "Vasques sculpturales en pierre et baignoire en travertin" : language === "en" ? "Sculptural stone basins and a travertine bathtub" : "أحواض حجرية منحوتة وحوض استحمام من الترافرتين"}
          width={1920}
          height={1088}
          className="h-[68vh] min-h-[420px] w-full object-cover md:h-[78vh]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/25 px-6">
          <div className="rise-in max-w-2xl text-center">
            <h1 className="text-3xl leading-tight font-medium text-foreground md:text-5xl">
              {t.home.hero}
            </h1>
            <Link
              to="/products"
              className="eyebrow mt-8 inline-block text-foreground link-underline"
            >
              {t.home.collectionCta}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-xl leading-snug font-medium md:text-2xl">
          {t.home.introTitle}
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          {t.home.introBody}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <p className="eyebrow">{t.home.discover}</p>
        <h2 className="mt-2 text-3xl font-medium md:text-4xl">{t.home.collections}</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat.slug} to="/products" className="group block">
              <div className="overflow-hidden bg-muted">
                <img
                  src={cat.image}
                  alt={cat.name[language]}
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-5 text-lg font-medium">{cat.name[language]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cat.description[language]}
              </p>
              <span className="eyebrow mt-4 inline-block text-foreground">{t.home.viewProducts}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
