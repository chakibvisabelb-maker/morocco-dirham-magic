import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/lib/i18n";

const nav = [
  { to: "/about", key: "about" },
  { to: "/products", key: "products" },
  { to: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <header className="site-menu sticky top-0 z-50 bg-menu-surface text-menu-foreground">
      <div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-3 px-4 py-4 md:min-h-20 md:px-16">
        <nav aria-label={language === "fr" ? "Navigation principale" : language === "ar" ? "القائمة الرئيسية" : "Main navigation"} className="flex flex-1 items-center justify-between gap-3 pe-2 text-xs font-normal tracking-normal uppercase md:gap-6 md:pe-20 md:text-sm">

          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="decoration-1 underline-offset-4 hover:underline focus-visible:underline"
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto shrink-0 rounded-none p-0 text-sm font-normal text-menu-foreground hover:bg-transparent hover:text-menu-foreground" aria-label={language === "fr" ? "Choisir la langue" : language === "en" ? "Choose language" : "اختيار اللغة"}>
              <span dir="ltr"><span className={language === "en" ? "underline underline-offset-4" : ""}>EN</span>/<span className={language === "fr" ? "underline underline-offset-4" : ""}>FR</span>{language === "ar" && "/ع"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value={language} onValueChange={(value) => { if (value === "en" || value === "fr" || value === "ar") setLanguage(value); }}>
              <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="fr">Français</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="ar">العربية</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
