import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-stone.jpg";
import { categories } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUXORA — Bathtubs, faucets & fixtures in Marrakech" },
      {
        name: "description",
        content:
          "Curated bathtubs, faucets, showers, fixtures and smart locks. Timeless design, lasting quality, prices in Moroccan dirham.",
      },
      { property: "og:title", content: "LUXORA — For your home. For your comfort. For you." },
      {
        property: "og:description",
        content:
          "A curated selection of bathtubs, faucets, showers and fixtures, priced in Moroccan dirham.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative">
        <img
          src={heroImage}
          alt="Sculptural stone basins and a travertine bathtub"
          width={1920}
          height={1088}
          className="h-[68vh] min-h-[420px] w-full object-cover md:h-[78vh]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/25 px-6">
          <div className="rise-in max-w-2xl text-center">
            <h1 className="text-3xl leading-tight font-medium text-foreground md:text-5xl">
              Time-honored craft. Time-tested design. Make a statement that lasts a lifetime
              with Luxora
            </h1>
            <Link
              to="/products"
              className="eyebrow mt-8 inline-block text-foreground link-underline"
            >
              See the collection
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-xl leading-snug font-medium md:text-2xl">
          We are for a design made to last. For your home. For you.
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          At LUXORA, we believe every detail matters. That's why we offer a carefully curated
          selection of bathtubs, faucets, showers, fixtures and accessories that combine
          timeless design with lasting quality. Our products are crafted to enhance your home
          with both beauty and functionality, so you can enjoy spaces that feel as good as
          they look — today, tomorrow and for years to come.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <p className="eyebrow">Discover our</p>
        <h2 className="mt-2 text-3xl font-medium md:text-4xl">Collections</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat.slug} to="/products" className="group block">
              <div className="overflow-hidden bg-muted">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-5 text-lg font-medium">{cat.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
              <span className="eyebrow mt-4 inline-block text-foreground">View products</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
