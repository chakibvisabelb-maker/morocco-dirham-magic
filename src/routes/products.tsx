import { createFileRoute } from '@tanstack/react-router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { buildCataloguePdf, saveToComputer } from '@/lib/catalogue-pdf';
import { CataloguePageImage } from '@/components/catalogue-page-image';
import { ChevronLeft, ChevronRight, Download, Maximize2, Search } from 'lucide-react';
import { allCategories, categories, cataloguePageUrl, lowBudgetCategories, lowBudgetGroup, LOW_BUDGET } from '@/lib/products';
const segments = { fr: { high: 'Segment haut et milieu de gamme', low: 'Segment petit budget' }, en: { high: 'High-Mid Segment', low: 'Low Budget Segment' }, ar: { high: 'الفئة الراقية والمتوسطة', low: 'الفئة الاقتصادية' } };
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export const Route = createFileRoute('/products')({
  validateSearch: (search: Record<string, unknown>) => ({ category: typeof search['category'] === 'string' ? search['category'] : undefined }),
  head: () => ({ meta: [{ title: 'Catalogues — LUXORA Marrakech' }, { name: 'description', content: 'Tous les produits des catalogues LUXORA, avec leurs photos, références, dimensions et finitions.' }, { property: 'og:title', content: 'Catalogues — LUXORA Marrakech' }, { property: 'og:description', content: 'Découvrez les collections LUXORA haut et milieu de gamme et sanitaire petit budget.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: ProductsPage,
});
const copy = {
  fr: { pages: 'pages', open: 'Consulter le catalogue', back: 'Tous les catalogues', page: 'Page', download: 'Télécharger le PDF', prepare: 'Préparer le PDF', creating: 'Préparation du PDF…', failed: 'Le PDF n’a pas pu être créé. Réessayez.', saved: 'PDF enregistré sur votre ordinateur.', downloaded: 'PDF téléchargé dans votre dossier Téléchargements.', shared: 'Partage ouvert — choisissez « Enregistrer dans Fichiers ».', again: 'Télécharger à nouveau', search: 'Rechercher une référence…', noResults: 'Aucune page ne correspond à cette référence.', previous: 'Page précédente', next: 'Page suivante', enlarge: 'Agrandir', soon: 'Ce catalogue arrive bientôt.', note: '' },
  en: { pages: 'pages', open: 'Browse catalogue', back: 'All catalogues', page: 'Page', download: 'Download PDF', prepare: 'Prepare the PDF', creating: 'Preparing PDF…', failed: 'The PDF could not be created. Please try again.', saved: 'PDF saved to your computer.', downloaded: 'PDF downloaded to your Downloads folder.', shared: 'Sharing opened — choose “Save to Files”.', again: 'Download again', search: 'Search a reference…', noResults: 'No pages match this reference.', previous: 'Previous page', next: 'Next page', enlarge: 'Enlarge', soon: 'This catalogue is coming soon.', note: '' },
  ar: { pages: 'صفحة', open: 'تصفح الكتالوج', back: 'جميع الكتالوجات', page: 'صفحة', download: 'تنزيل ملف PDF', prepare: 'تحضير ملف PDF', creating: 'جارٍ تحضير ملف PDF…', failed: 'تعذّر إنشاء ملف PDF. حاول مرة أخرى.', saved: 'تم حفظ ملف PDF على جهازك.', downloaded: 'تم تنزيل ملف PDF في مجلد التنزيلات.', shared: 'تم فتح المشاركة — اختر «حفظ في الملفات».', again: 'تنزيل مرة أخرى', search: 'ابحث عن مرجع…', noResults: 'لا توجد صفحات تطابق هذا المرجع.', previous: 'الصفحة السابقة', next: 'الصفحة التالية', enlarge: 'تكبير', soon: 'هذا الكتالوج قريباً.', note: '' },
};
const AUTO_PREPARE_MAX = Infinity;
const HIGH_MID = 'high-mid';

function ProductsPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { language, t } = useLanguage();
  const c = copy[language];
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [enlarged, setEnlarged] = useState(false);
  const [pdf, setPdf] = useState<{ blob: Blob; url: string }>();
  const [pdfState, setPdfState] = useState<'idle' | 'busy' | 'ready' | 'error'>('idle');
  const [savedNote, setSavedNote] = useState<string>();
  const pdfRef = useRef<{ url: string } | undefined>(undefined);
  const active = allCategories.find(item => item.slug === category);
  // Opening Products without a tab lands on the Low Budget Segment; the High-Mid
  // Segment is only shown once it is asked for by name.
  const inGroup = active ? active.group === LOW_BUDGET : category !== HIGH_MID;
  const overview = !active;
  const showAll = inGroup ? !category || category === LOW_BUDGET : category === HIGH_MID;
  function select(slug?: string) {
    setPage(0); setQuery('');
    void navigate({ search: { category: slug } });
  }
  const matching = active?.pages.map((item, index) => ({ item, index })).filter(({ item }) => (item.text + ' ' + (item.frText ?? '') + ' ' + (item.arText ?? '')).toLowerCase().includes(query.trim().toLowerCase())) ?? [];
  const position = Math.min(page, Math.max(0, matching.length - 1));
  const current = matching[position];
  const pdfKey = active ? `${active.slug}|${language}|${query.trim().toLowerCase()}|${matching.length}` : '';
  const filename = `luxora-${active?.slug ?? 'catalogue'}-${language}${query.trim() ? '-search' : ''}.pdf`;
  function buildPdf() {
    return buildCataloguePdf(matching.map(({ item, index }) => ({ url: cataloguePageUrl(item, language), number: index + 1 })));
  }
  // The save dialog needs the click itself, so the PDF is built in advance and
  // the button only hands over a finished file.
  useEffect(() => {
    if (pdfRef.current) URL.revokeObjectURL(pdfRef.current.url);
    pdfRef.current = undefined;
    setPdf(undefined); setPdfState('idle'); setSavedNote(undefined);
    if (!active || !matching.length || matching.length > AUTO_PREPARE_MAX) return;
    let cancelled = false;
    setPdfState('busy');
    const timer = setTimeout(() => {
      void buildPdf().then(blob => {
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        pdfRef.current = { url };
        setPdf({ blob, url });
        setPdfState('ready');
      }).catch(() => { if (!cancelled) setPdfState('error'); });
    }, query.trim() ? 400 : 0);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [pdfKey]);
  function preparePdf() {
    if (!matching.length || pdfState === 'busy') return;
    setPdfState('busy'); setSavedNote(undefined);
    void buildPdf().then(blob => {
      const url = URL.createObjectURL(blob);
      pdfRef.current = { url };
      setPdf({ blob, url });
      setPdfState('ready');
    }).catch(() => setPdfState('error'));
  }
  const pdfLabel = pdfState === 'busy' ? c.creating : pdf ? c.download : c.prepare;
  const pager = <div className="flex items-center justify-center gap-2" dir="ltr"><Button size="icon" variant="outline" disabled={position === 0} aria-label={c.previous} onClick={() => setPage(position - 1)}><ChevronLeft /></Button><Button size="icon" variant="outline" disabled={position >= matching.length - 1} aria-label={c.next} onClick={() => setPage(position + 1)}><ChevronRight /></Button></div>;
  return <div className="mx-auto max-w-7xl px-6 py-20">
    <div className="flex flex-wrap gap-2 border-b border-border pb-5">


      <Button variant={inGroup ? 'secondary' : 'ghost'} onClick={() => select(LOW_BUDGET)}>{segments[language].low}</Button>
      <Button variant={!inGroup ? 'secondary' : 'ghost'} onClick={() => select(HIGH_MID)}>{segments[language].high}</Button>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      <Button size="sm" variant={showAll ? 'secondary' : 'outline'} onClick={() => select(inGroup ? LOW_BUDGET : HIGH_MID)}>{t.products.all}</Button>
      {(inGroup ? lowBudgetCategories : categories).map(item => <Button key={item.slug} size="sm" variant={active?.slug === item.slug ? 'secondary' : 'outline'} onClick={() => select(item.slug)}>{item.tagline[language]}</Button>)}
    </div>
    {overview ? <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{(inGroup ? lowBudgetCategories : categories).map(item => {
      const first = item.pages[0];
      return <article key={item.slug}>
      <button className="group block w-full cursor-pointer overflow-hidden bg-muted" onClick={() => select(item.slug)} aria-label={`${c.open} — ${item.name[language]}`}>{first ? <img src={cataloguePageUrl(first, language)} alt={item.name[language]} width={first.width} height={first.height} loading="lazy" className={`${inGroup ? "aspect-[4/3]" : "aspect-[4/5]"} w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]`} /> : <img src={item.image} alt={item.name[language]} width={1024} height={1280} loading="lazy" className={`${inGroup ? "aspect-[4/3]" : "aspect-[4/5]"} w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]`} />}</button>
      <div className="mt-5 flex items-baseline justify-between gap-4"><h2 className="text-lg font-medium">{item.name[language]}</h2>{item.pages.length > 0 && <span className="whitespace-nowrap text-xs text-muted-foreground">{item.pages.length} {c.pages}</span>}</div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description[language]}</p>
      <Button variant="link" className="mt-3 px-0" onClick={() => select(item.slug)}>{c.open}</Button>
    </article>;})}</div> : <section className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-medium">{active.name[language]}</h2>{active.pages.length > 0 && <div className="flex flex-col items-end gap-1">{pdf && pdfState === 'ready' ? <Button variant="outline" onClick={() => { if (!pdf) return; setSavedNote(undefined); void saveToComputer(pdf.blob, filename).then(outcome => setSavedNote(outcome === 'saved' ? c.saved : outcome === 'downloaded' ? c.downloaded : outcome === 'shared' ? c.shared : undefined)); }}><Download />{pdfLabel} · {matching.length} {c.pages}</Button> : <Button variant="outline" disabled={pdfState === 'busy' || !matching.length} onClick={() => preparePdf()}><Download />{pdfLabel} · {matching.length} {c.pages}</Button>}{pdfState === 'error' && <span role="alert" className="text-xs text-destructive">{c.failed}</span>}{savedNote && pdfState === 'ready' && <span className="text-xs text-muted-foreground">{savedNote}</span>}</div>}</div>
      {active.pages.length > 0 && <label className="mt-6 flex max-w-sm items-center gap-3 rounded-md border border-border px-3"><Search className="size-4 shrink-0 text-muted-foreground" /><input className="h-11 min-w-0 w-full bg-transparent text-sm outline-none" aria-label={c.search} placeholder={c.search} value={query} onChange={event => { setQuery(event.target.value); setPage(0); }} /></label>}
      {matching.length ? <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{matching.map(({ item, index }, k) => <Fragment key={item.url}>
        {item.section && item.section.en !== matching[k - 1]?.item.section?.en && <h3 className="col-span-full border-b border-border pb-3 pt-6 text-xl font-medium first:pt-0">{item.section[language]}</h3>}
        <article className="flex flex-col">
        <button className="group block w-full cursor-pointer overflow-hidden border border-border bg-muted" onClick={() => { setPage(matching.findIndex(m => m.index === index)); setEnlarged(true); }} aria-label={`${c.enlarge} — ${c.page} ${index + 1}`}>
          <CataloguePageImage src={cataloguePageUrl(item, language)} number={index + 1} alt={`${active.name[language]} — ${c.page} ${index + 1}`} width={item.width} height={item.height} className="aspect-[4/3] w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" />
        </button>
        <div className="mt-4 flex items-baseline justify-between gap-3"><h3 className="text-base font-medium">{active.name[language]} · {c.page} {index + 1}</h3></div>
        <div className="mt-3 flex items-center justify-between gap-3"><Button variant="ghost" size="sm" className="px-0" onClick={() => { setPage(matching.findIndex(m => m.index === index)); setEnlarged(true); }}><Maximize2 />{c.enlarge}</Button><a className="eyebrow link-underline" href={`mailto:info@luxora.ma?subject=${encodeURIComponent(`${t.products.enquirySubject} — ${active.name[language]} — ${c.page} ${index + 1}`)}`}>{t.products.enquire}</a></div>
      </article></Fragment>)}</div> : <p className="py-16 text-muted-foreground">{active.pages.length ? c.noResults : c.soon}</p>}
      {current && <Dialog open={enlarged} onOpenChange={setEnlarged}><DialogContent className="max-h-[95dvh] max-w-[95vw] overflow-auto p-4"><DialogTitle>{active.name[language]} — {c.page} {current.index + 1}</DialogTitle><DialogDescription className="sr-only">{active.name[language]} — {c.page} {current.index + 1}</DialogDescription>{pager}<CataloguePageImage src={cataloguePageUrl(current.item, language)} number={current.index + 1} alt={`${active.name[language]} — ${c.page} ${current.index + 1}`} width={current.item.width} height={current.item.height} className="h-auto w-full" />{pager}</DialogContent></Dialog>}
      <div className="mt-10"><Button variant="outline" onClick={() => select(inGroup ? LOW_BUDGET : HIGH_MID)}>{inGroup ? '← ' + lowBudgetGroup.tagline[language] : c.back}</Button></div>
    </section>}
  </div>;
}
