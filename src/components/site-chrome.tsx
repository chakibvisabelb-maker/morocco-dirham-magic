import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-3 px-6 py-5">
        <Link to="/" className="shrink-0">
          <span className="text-3xl font-semibold tracking-[-0.06em] text-foreground md:text-4xl">
            LUXORA
          </span>
        </Link>
        <p className="hidden text-sm leading-snug font-medium text-foreground lg:block">
          For your home.
          <br />
          For your comfort.
          <br />
          For you.
        </p>
        <nav className="ml-auto flex items-center gap-7 text-xs tracking-[0.18em] uppercase">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <span className="text-3xl font-semibold tracking-[-0.06em]">LUXORA</span>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            For your home.
            <br />
            For your comfort.
            <br />
            For you.
          </p>
        </div>
        <div>
          <p className="eyebrow">Where</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Rue Ibn Sina, 1er étage, N 11
            <br />
            40000 Marrakech Guéliz
          </p>
        </div>
        <div>
          <p className="eyebrow">Contact us</p>
          <a
            href="mailto:info@luxora.ma"
            className="link-underline mt-3 inline-block text-sm text-muted-foreground hover:text-foreground"
          >
            info@luxora.ma
          </a>
          <p className="mt-6 text-xs text-muted-foreground">
            All prices shown in Moroccan dirham (MAD).
          </p>
        </div>
      </div>
    </footer>
  );
}
