import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { categories, products } from "@/lib/products";
import { formatMadFromCny } from "@/lib/currency";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — LUXORA Marrakech" },
      {
        name: "description",
        content:
          "Browse Luxora bathtubs, faucets, showers, fixtures and smart locks with prices in Moroccan dirham.",
      },
      { property: "og:title", content: "Products — LUXORA" },
      {
        property: "og:description",
        content: "Bathtubs, faucets, showers, fixtures and smart locks, priced in dirham.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow">Catalogue</p>
      <h1 className="mt-2 text-4xl font-medium md:text-5xl">Everything for your bathroom</h1>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        All prices are shown in Moroccan dirham, converted from our suppliers' yuan pricing.
        Contact us for volume pricing, lead times and installation.
      </p>

      <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-b border-border pb-5 text-xs tracking-[0.18em] uppercase">
        <button
          onClick={() => setActive("all")}
          className={
            active === "all"
              ? "text-foreground"
              : "text-muted-foreground transition-colors hover:text-foreground"
          }
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActive(cat.slug)}
            className={
              active === cat.slug
                ? "text-foreground"
                : "text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {cat.tagline}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <article key={p.id} className="group">
            <div className="overflow-hidden bg-muted">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={1200}
                height={1504}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h2 className="text-base font-medium">{p.name}</h2>
              <span className="text-sm whitespace-nowrap text-accent">
                {formatMadFromCny(p.priceCny)}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.material}</p>
            <a
              href={`mailto:info@luxora.ma?subject=${encodeURIComponent(`Enquiry — ${p.name} (${p.id})`)}`}
              className="eyebrow link-underline mt-4 inline-block text-foreground"
            >
              Enquire
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
