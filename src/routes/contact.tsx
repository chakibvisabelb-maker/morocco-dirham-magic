import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LUXORA Marrakech" },
      {
        name: "description",
        content:
          "Visit the Luxora showroom in Marrakech Guéliz or email info@luxora.ma for pricing in dirham.",
      },
      { property: "og:title", content: "Contact — LUXORA" },
      {
        property: "og:description",
        content: "Showroom in Marrakech Guéliz. Email info@luxora.ma.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow">Let's get</p>
      <h1 className="mt-2 text-4xl font-medium md:text-5xl">In touch</h1>

      <div className="mt-14 grid gap-12 md:grid-cols-3">
        <div>
          <p className="eyebrow">Email</p>
          <a
            href="mailto:info@luxora.ma"
            className="link-underline mt-3 inline-block text-lg"
          >
            info@luxora.ma
          </a>
        </div>
        <div>
          <p className="eyebrow">Showroom</p>
          <p className="mt-3 text-lg leading-snug">
            Rue Ibn Sina, 1er étage, N 11
            <br />
            40000 Marrakech Guéliz
          </p>
        </div>
        <div>
          <p className="eyebrow">Pricing</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Every price on this site is shown in Moroccan dirham. Ask us for a full quotation
            including delivery and installation anywhere in Morocco.
          </p>
        </div>
      </div>
    </div>
  );
}
