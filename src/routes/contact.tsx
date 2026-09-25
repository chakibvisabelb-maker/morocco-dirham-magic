import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LUXORA Marrakech" },
      {
        name: "description",
        content:
          "Visitez le showroom Luxora à Marrakech Guéliz ou contactez info@luxora.ma pour nos tarifs en dirham.",
      },
      { property: "og:title", content: "Contact — LUXORA" },
      {
        property: "og:description",
        content: "Showroom à Marrakech Guéliz. E-mail info@luxora.ma.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <p className="eyebrow">{t.contact.pretitle}</p>
      <h1 className="mt-2 text-4xl font-medium md:text-5xl">{t.contact.title}</h1>

      <div className="mt-14 grid gap-12 md:grid-cols-3">
        <div>
          <p className="eyebrow">{t.contact.email}</p>
          <a
            href="mailto:info@luxora.ma"
            className="link-underline mt-3 inline-block text-lg"
          >
            info@luxora.ma
          </a>
        </div>
        <div>
          <p className="eyebrow">{t.contact.showroom}</p>
          <p className="mt-3 text-lg leading-snug">
            Rue Ibn Sina, 1er étage, N 11
            <br />
            40000 Marrakech Guéliz
          </p>
        </div>
        <div>
          <p className="eyebrow">{t.contact.pricing}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {t.contact.pricingBody}
          </p>
        </div>
      </div>
    </div>
  );
}
