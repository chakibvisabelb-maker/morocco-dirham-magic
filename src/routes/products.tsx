import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Maximize2, Search } from 'lucide-react';
import { categories, type Category } from '@/lib/products';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export const Route = createFileRoute('/products')({
  validateSearch: (search: Record<string, unknown>) => ({ category: typeof search['category'] === 'string' ? search['category'] : undefined }),
  head: () => ({ meta: [{ title: 'Catalogues — LUXORA Marrakech' }, { name: 'description', content: 'Tous les produits des catalogues LUXORA, avec leur présentation originale et des prix en dirham marocain.' }] }),
  component: ProductsPage,
});
const copy = {
  fr: { intro: 'Les cinq catalogues complets, avec leurs photos, références, dimensions et finitions originales. Les prix indiqués sont en dirham marocain (MAD).', pages: 'pages', open: 'Consulter le catalogue', back: 'Tous les catalogues', page: 'Page', download: 'Télécharger en MAD', search: 'Rechercher une référence…', noResults: 'Aucune page ne correspond à cette référence.', previous: 'Page précédente', next: 'Page suivante', enlarge: 'Agrandir', note: 'Présentation et texte des catalogues conservés dans leur langue originale. Conversion : 1 CNY = 1,40 MAD, arrondie à 10 MAD.', unpriced: 'Ce catalogue ne contient pas de prix. Contactez-nous pour un devis.' },
  en: { intro: 'All five complete catalogues, with their original photos, references, dimensions and finishes. Listed prices are in Moroccan dirham (MAD).', pages: 'pages', open: 'Browse catalogue', back: 'All catalogues', page: 'Page', download: 'Download in MAD', search: 'Search a reference…', noResults: 'No pages match this reference.', previous: 'Previous page', next: 'Next page', enlarge: 'Enlarge', note: 'Catalogue layouts and text are preserved in their original language. Conversion: 1 CNY = 1.40 MAD, rounded to 10 MAD.', unpriced: 'This catalogue has no listed prices. Contact us for a quote.' },
  ar: { intro: 'الكتالوجات الخمسة كاملة بصورها ومراجعها وأبعادها وتشطيباتها الأصلية. الأسعار المعروضة بالدرهم المغربي (MAD).', pages: 'صفحة', open: 'تصفح الكتالوج', back: 'جميع الكتالوجات', page: 'صفحة', download: 'تحميل بالدرهم', search: 'ابحث عن مرجع…', noResults: 'لا توجد صفحات تطابق هذا المرجع.', previous: 'الصفحة السابقة', next: 'الصفحة التالية', enlarge: 'تكبير', note: 'تم الحفاظ على تصميم الكتالوجات ونصوصها بلغتها الأصلية. التحويل: 1 يوان = 1.40 درهم، مع التقريب إلى 10 دراهم.', unpriced: 'لا يحتوي هذا الكتالوج على أسعار. تواصل معنا للحصول على عرض سعر.' },
};

function ProductsPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { language, t } = useLanguage();
  const c = copy[language];
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [enlarged, setEnlarged] = useState(false);
  const active = categories.find(item => item.slug === category);
  function select(item?: Category) {
    setPage(0); setQuery('');
    void navigate({ search: { category: item?.slug } });
  }
  const matching = active?.pages.map((item, index) => ({ item, index })).filter(({ item }) => item.text.toLowerCase().includes(query.trim().toLowerCase())) ?? [];
  const position = Math.min(page, Math.max(0, matching.length - 1));
  const current = matching[position];
  return <div className="mx-auto max-w-7xl px-6 py-20">
    <p className="eyebrow">{t.products.catalogue}</p>
    <h1 className="mt-2 text-4xl font-medium md:text-5xl">{t.products.title}</h1>
    <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">{c.intro}</p>
    <div className="mt-10 flex flex-wrap gap-2 border-b border-border pb-5">
      <Button variant={!active ? 'secondary' : 'ghost'} onClick={() => select()}>{t.products.all}</Button>
      {categories.map(item => <Button key={item.slug} variant={active?.slug === item.slug ? 'secondary' : 'ghost'} onClick={() => select(item)}>{item.tagline[language]}</Button>)}
    </div>
    {!active ? <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{categories.map(item => <article key={item.slug}>
      <button className="group block w-full cursor-pointer overflow-hidden bg-muted" onClick={() => select(item)} aria-label={`${c.open} — ${item.name[language]}`}><img src={item.image} alt={item.name[language]} width={item.pages[0]!.width} height={item.pages[0]!.height} loading="lazy" className="aspect-[4/5] w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]" /></button>
      <div className="mt-5 flex items-baseline justify-between gap-4"><h2 className="text-lg font-medium">{item.name[language]}</h2><span className="whitespace-nowrap text-xs text-muted-foreground">{item.pages.length} {c.pages}</span></div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description[language]}</p>
      <Button variant="link" className="mt-3 px-0" onClick={() => select(item)}>{c.open}</Button>
    </article>)}</div> : <section className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-medium">{active.name[language]}</h2><Button asChild variant="outline"><a href={active.pdf} target="_blank" rel="noreferrer"><Download />{c.download}</a></Button></div>
      {active.slug === 'locks' ? <p className="mt-4 text-sm text-muted-foreground">{c.unpriced}</p> : <label className="mt-6 flex max-w-sm items-center gap-3 rounded-md border border-border px-3"><Search className="size-4 shrink-0 text-muted-foreground" /><input className="h-11 min-w-0 w-full bg-transparent text-sm outline-none" aria-label={c.search} placeholder={c.search} value={query} onChange={event => { setQuery(event.target.value); setPage(0); }} /></label>}
      {matching.length ? <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{matching.map(({ item, index }) => <article key={item.url} className="flex flex-col">
        <button className="group block w-full cursor-pointer overflow-hidden border border-border bg-muted" onClick={() => { setPage(matching.findIndex(m => m.index === index)); setEnlarged(true); }} aria-label={`${c.enlarge} — ${c.page} ${index + 1}`}>
          <img src={item.url} alt={`${active.name[language]} — ${c.page} ${index + 1}`} width={item.width} height={item.height} loading="lazy" className="aspect-[4/3] w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" />
        </button>
        <div className="mt-4 flex items-baseline justify-between gap-3"><h3 className="text-base font-medium">{active.name[language]} · {c.page} {index + 1}</h3><span className="whitespace-nowrap text-xs text-muted-foreground">{item.convertedPrices > 0 ? 'MAD' : c.onRequest}</span></div>
        <div className="mt-3 flex items-center justify-between gap-3"><Button variant="ghost" size="sm" className="px-0" onClick={() => { setPage(matching.findIndex(m => m.index === index)); setEnlarged(true); }}><Maximize2 />{c.enlarge}</Button><a className="eyebrow link-underline" href={`mailto:info@luxora.ma?subject=${encodeURIComponent(`${t.products.enquirySubject} — ${active.name[language]} — ${c.page} ${index + 1}`)}`}>{t.products.enquire}</a></div>
      </article>)}</div> : <p className="py-16 text-muted-foreground">{c.noResults}</p>}
      {current && <Dialog open={enlarged} onOpenChange={setEnlarged}><DialogContent className="max-h-[95dvh] max-w-[95vw] overflow-auto p-4"><DialogTitle>{active.name[language]} — {c.page} {current.index + 1}</DialogTitle><DialogDescription>{c.note}</DialogDescription><div className="flex items-center gap-2" dir="ltr"><Button size="icon" variant="outline" disabled={position === 0} aria-label={c.previous} onClick={() => setPage(position - 1)}><ChevronLeft /></Button><Button size="icon" variant="outline" disabled={position >= matching.length - 1} aria-label={c.next} onClick={() => setPage(position + 1)}><ChevronRight /></Button></div><img src={current.item.url} alt={`${active.name[language]} — ${c.page} ${current.index + 1}`} width={current.item.width} height={current.item.height} className="h-auto w-full" /></DialogContent></Dialog>}
      <div className="mt-10"><Button variant="outline" onClick={() => select()}>{c.back}</Button></div>
    </section>}
    <p className="mt-12 text-xs leading-relaxed text-muted-foreground">{c.note}</p>
  </div>;
}
