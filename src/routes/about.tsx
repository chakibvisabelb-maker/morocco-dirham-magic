import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/hero-stone.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — LUXORA Marrakech" },
      {
        name: "description",
        content:
          "Luxora curates bathtubs, faucets, showers and fixtures for Moroccan homes, with design made to last.",
      },
      { property: "og:title", content: "About — LUXORA" },
      {
        property: "og:description",
        content: "Design made to last, curated for Moroccan homes from our Marrakech showroom.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow">About</p>
      <h1 className="mt-2 max-w-3xl text-4xl leading-tight font-medium md:text-5xl">
        We are for a design made to last. For your home. For you.
      </h1>

      <div className="mt-14 grid gap-14 md:grid-cols-2">
        <img
          src={heroImage}
          alt="Stone basins and travertine bathtub in a studio setting"
          loading="lazy"
          width={1920}
          height={1088}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            At LUXORA, we believe every detail matters. We offer a carefully curated selection
            of bathtubs, faucets, showers, fixtures and accessories that combine timeless
            design with lasting quality.
          </p>
          <p>
            We work directly with manufacturing partners, which keeps quality high and pricing
            honest. Supplier quotations are issued in Chinese yuan; everything you see on this
            site is converted and displayed in Moroccan dirham, so the price you read is the
            price we quote.
          </p>
          <p>
            Visit our showroom in Marrakech Guéliz to see the materials in person — stone,
            brushed brass, matte black steel and fine fire clay.
          </p>
        </div>
      </div>
    </div>
  );
}
