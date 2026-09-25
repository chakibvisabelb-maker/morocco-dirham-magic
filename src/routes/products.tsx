import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { categories, products } from "@/lib/products";
import { formatMadFromCny } from "@/lib/currency";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Produits — LUXORA Marrakech" },
      {
        name: "description",
        content:
          "Découvrez les baignoires, robinets, douches, équipements et serrures Luxora, avec prix en dirham marocain.",
      },
      { property: "og:title", content: "Produits — LUXORA" },
      {
        property: "og:description",
        content: "Baignoires, robinets, douches, équipements et serrures, avec prix en dirham.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [active, setActive] = useState<string>("all");
  const { language, t } = useLanguage();
  const shown = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow">{t.products.catalogue}</p>
      <h1 className="mt-2 text-4xl font-medium md:text-5xl">{t.products.title}</h1>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {t.products.intro}
      </p>

      <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-b border-border pb-5 text-xs tracking-[0.18em] uppercase">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setActive("all")}
          className={
            active === "all"
              ? "text-foreground"
              : "text-muted-foreground transition-colors hover:text-foreground"
          }
        >
          {t.products.all}
        </Button>
        {categories.map((cat) => (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={
              active === cat.slug
                ? "text-foreground"
                : "text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {cat.tagline[language]}
          </Button>
        ))}
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <article key={p.id} className="group">
            <div className="overflow-hidden bg-muted">
              <img
                src={p.image}
                alt={p.name[language]}
                loading="lazy"
                width={1200}
                height={1504}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h2 className="text-base font-medium">{p.name[language]}</h2>
              <span className="text-sm whitespace-nowrap text-accent">
                {formatMadFromCny(p.priceCny)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.material[language]}</p>
            <a
              href={`mailto:info@luxora.ma?subject=${encodeURIComponent(`${t.products.enquirySubject} — ${p.name[language]} (${p.id})`)}`}
              className="eyebrow link-underline mt-4 inline-block text-foreground"
            >
              {t.products.enquire}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
