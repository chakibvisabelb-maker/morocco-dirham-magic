import { Link } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const nav = [
  { to: "/about", key: "about" },
  { to: "/products", key: "products" },
  { to: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-3 px-6 py-5">
        <Link to="/" className="shrink-0">
          <span className="text-3xl font-semibold tracking-[-0.06em] text-foreground md:text-4xl">
            LUXORA
          </span>
        </Link>
        <p className="hidden text-sm leading-snug font-medium text-foreground lg:block">
          {t.brandLine.map((line) => <span key={line}>{line}<br /></span>)}
        </p>
        <nav className="ms-auto flex items-center gap-4 text-xs tracking-[0.18em] uppercase md:gap-7">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center rounded-md border border-border p-0.5" aria-label={language === "fr" ? "Choisir la langue" : language === "en" ? "Choose language" : "اختيار اللغة"}>
          <Languages aria-hidden="true" className="mx-2 size-4 text-muted-foreground" />
          <Button type="button" size="sm" variant={language === "fr" ? "secondary" : "ghost"} onClick={() => setLanguage("fr")} aria-pressed={language === "fr"}>FR</Button>
          <Button type="button" size="sm" variant={language === "en" ? "secondary" : "ghost"} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</Button>
          <Button type="button" size="sm" variant={language === "ar" ? "secondary" : "ghost"} onClick={() => setLanguage("ar")} aria-pressed={language === "ar"}>ع</Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <span className="text-3xl font-semibold tracking-[-0.06em]">LUXORA</span>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t.brandLine.map((line) => <span key={line}>{line}<br /></span>)}
          </p>
        </div>
        <div>
          <p className="eyebrow">{t.footer.where}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Rue Ibn Sina, 1er étage, N 11
            <br />
            40000 Marrakech Guéliz
          </p>
        </div>
        <div>
          <p className="eyebrow">{t.footer.contact}</p>
          <a
            href="mailto:info@luxora.ma"
            className="link-underline mt-3 inline-block text-sm text-muted-foreground hover:text-foreground"
          >
            info@luxora.ma
          </a>
          <p className="mt-6 text-xs text-muted-foreground">
            {t.footer.prices}
          </p>
        </div>
      </div>
    </footer>
  );
}
