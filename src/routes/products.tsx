import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { buildCataloguePdf, saveToComputer } from '@/lib/catalogue-pdf';
import { CataloguePageImage } from '@/components/catalogue-page-image';
import { ChevronLeft, ChevronRight, Download, Maximize2, Search } from 'lucide-react';
import { allCategories, categories, topLevelCategories, lowBudgetCategories, lowBudgetGroup, LOW_BUDGET, type Category } from '@/lib/products';
const segments = { fr: { high: 'Segment haut et milieu de gamme', low: 'Segment petit budget' }, en: { high: 'High-Mid Segment', low: 'Low Budget Segment' }, ar: { high: 'الفئة الراقية والمتوسطة', low: 'الفئة الاقتصادية' } };
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export const Route = createFileRoute('/products')({
  validateSearch: (search: Record<string, unknown>) => ({ category: typeof search['category'] === 'string' ? search['category'] : undefined }),
  head: () => ({ meta: [{ title: 'Catalogues — LUXORA Marrakech' }, { name: 'description', content: 'Tous les produits des catalogues LUXORA, avec leur présentation originale et des prix en dirham marocain.' }, { property: 'og:title', content: 'Catalogues — LUXORA Marrakech' }, { property: 'og:description', content: 'Les catalogues LUXORA avec prix en MAD et EUR, et prix FOB originaux pour le sanitaire petit budget.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: ProductsPage,
});
const copy = {
  fr: { intro: 'Les catalogues complets, avec leurs photos, références, dimensions et finitions originales. Les prix sont indiqués en dirham marocain (MAD) et en euro (EUR).', pages: 'pages', open: 'Consulter le catalogue', back: 'Tous les catalogues', page: 'Page', download: 'Télécharger le PDF', prepare: 'Préparer le PDF', creating: 'Préparation du PDF…', failed: 'Le PDF n’a pas pu être créé. Réessayez.', saved: 'PDF enregistré sur votre ordinateur.', downloaded: 'PDF téléchargé dans votre dossier Téléchargements.', shared: 'Partage ouvert — choisissez « Enregistrer dans Fichiers ».', again: 'Télécharger à nouveau', search: 'Rechercher une référence…', noResults: 'Aucune page ne correspond à cette référence.', previous: 'Page précédente', next: 'Page suivante', enlarge: 'Agrandir', note: 'Présentation et texte des catalogues conservés dans leur langue originale. Taux du 9 octobre 2026 : 1 CNY = 1,48 MAD = 0,1335 EUR (MAD arrondi à 10, EUR à l’unité).', lbNote: 'Sanitaire petit budget : prix FOB d’origine en EUR multipliés par 4 (×5 pour la page 2 des robinets ; ×3 pour la page 4 des WC et les pages 5 à 8 des douches), convertis en MAD au taux de 1 EUR = 11,09 MAD (arrondi à l’unité).', onRequest: 'Prix sur demande', unpriced: 'Ce catalogue ne contient pas de prix. Contactez-nous pour un devis.' },
  en: { intro: 'All the complete catalogues, with their original photos, references, dimensions and finishes. Prices are shown in Moroccan dirham (MAD) and euro (EUR).', pages: 'pages', open: 'Browse catalogue', back: 'All catalogues', page: 'Page', download: 'Download PDF', prepare: 'Prepare the PDF', creating: 'Preparing PDF…', failed: 'The PDF could not be created. Please try again.', saved: 'PDF saved to your computer.', downloaded: 'PDF downloaded to your Downloads folder.', shared: 'Sharing opened — choose “Save to Files”.', again: 'Download again', search: 'Search a reference…', noResults: 'No pages match this reference.', previous: 'Previous page', next: 'Next page', enlarge: 'Enlarge', note: 'Catalogue layouts and text are preserved in their original language. Rate of 9 October 2026: 1 CNY = 1.48 MAD = 0.1335 EUR (MAD rounded to 10, EUR to 1).', lbNote: 'Low Budget Sanitary: original FOB prices in EUR multiplied by 4 (×5 for Taps page 2; ×3 for Toilets page 4 and Showers pages 5–8), converted to MAD at 1 EUR = 11.09 MAD (rounded to 1).', onRequest: 'Price on request', unpriced: 'This catalogue has no listed prices. Contact us for a quote.' },
  ar: { intro: 'الكتالوجات كاملة بصورها ومراجعها وأبعادها وتشطيباتها الأصلية. الأسعار معروضة بالدرهم المغربي (MAD) واليورو (EUR).', pages: 'صفحة', open: 'تصفح الكتالوج', back: 'جميع الكتالوجات', page: 'صفحة', download: 'تنزيل ملف PDF', prepare: 'تحضير ملف PDF', creating: 'جارٍ تحضير ملف PDF…', failed: 'تعذّر إنشاء ملف PDF. حاول مرة أخرى.', saved: 'تم حفظ ملف PDF على جهازك.', downloaded: 'تم تنزيل ملف PDF في مجلد التنزيلات.', shared: 'تم فتح المشاركة — اختر «حفظ في الملفات».', again: 'تنزيل مرة أخرى', search: 'ابحث عن مرجع…', noResults: 'لا توجد صفحات تطابق هذا المرجع.', previous: 'الصفحة السابقة', next: 'الصفحة التالية', enlarge: 'تكبير', note: 'تم الحفاظ على تصميم الكتالوجات ونصوصها بلغتها الأصلية. سعر الصرف بتاريخ 9 أكتوبر 2026: 1 يوان = 1.48 درهم = 0.1335 يورو.', lbNote: 'الأدوات الصحية الاقتصادية: أسعار FOB الأصلية باليورو مضروبة في 4 (×5 للصفحة 2 من الصنابير، و×3 للصفحة 4 من المراحيض والصفحات 5–8 من الدُش)، محوّلة إلى الدرهم بسعر 1 يورو = 11.09 درهم.', onRequest: 'السعر عند الطلب', unpriced: 'لا يحتوي هذا الكتالوج على أسعار. تواصل معنا للحصول على عرض سعر.' },
};
const AUTO_PREPARE_MAX = 20;

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
  const inGroup = category === LOW_BUDGET || active?.group === LOW_BUDGET;
  const overview = !active;
  const showAll = !category;
  function select(item?: Category) {
    setPage(0); setQuery('');
    void navigate({ search: { category: item?.slug } });
  }
  const matching = active?.pages.map((item, index) => ({ item, index })).filter(({ item }) => (item.text + ' ' + (item.frText ?? '')).toLowerCase().includes(query.trim().toLowerCase())) ?? [];
  const position = Math.min(page, Math.max(0, matching.length - 1));
  const current = matching[position];
  const pdfKey = active ? `${active.slug}|${language}|${query.trim().toLowerCase()}|${matching.length}` : '';
  const filename = `luxora-${active?.slug ?? 'catalogue'}-${language}${query.trim() ? '-search' : ''}.pdf`;
  function buildPdf() {
    return buildCataloguePdf(matching.map(({ item, index }) => ({ url: (language === 'fr' && item.frUrl) || item.url, number: index + 1 })));
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


      <Button variant={!inGroup ? 'secondary' : 'ghost'} onClick={() => select()}>{segments[language].high}</Button>
      <Button variant={inGroup ? 'secondary' : 'ghost'} onClick={() => select(lowBudgetGroup)}>{segments[language].low}</Button>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      <Button size="sm" variant={(inGroup ? category === LOW_BUDGET : showAll) ? 'secondary' : 'outline'} onClick={() => select(inGroup ? lowBudgetGroup : undefined)}>{t.products.all}</Button>
      {(inGroup ? lowBudgetCategories : categories).map(item => <Button key={item.slug} size="sm" variant={active?.slug === item.slug ? 'secondary' : 'outline'} onClick={() => select(item)}>{item.tagline[language]}</Button>)}
    </div>
    {overview ? <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{(inGroup ? lowBudgetCategories : categories).map(item => <article key={item.slug}>
      <button className="group block w-full cursor-pointer overflow-hidden bg-muted" onClick={() => select(item)} aria-label={`${c.open} — ${item.name[language]}`}><img src={(language === 'fr' && item.pages[0]?.frUrl) || item.image} alt={item.name[language]} width={item.pages[0]!.width} height={item.pages[0]!.height} loading="lazy" className={`${inGroup ? "aspect-[4/3]" : "aspect-[4/5]"} w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]`} /></button>
      <div className="mt-5 flex items-baseline justify-between gap-4"><h2 className="text-lg font-medium">{item.name[language]}</h2><span className="whitespace-nowrap text-xs text-muted-foreground">{item.pages.length} {c.pages}</span></div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description[language]}</p>
      <Button variant="link" className="mt-3 px-0" onClick={() => select(item)}>{c.open}</Button>
    </article>)}</div> : <section className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-medium">{active.name[language]}</h2><div className="flex flex-col items-end gap-1">{pdf && pdfState === 'ready' ? <Button variant="outline" onClick={() => { if (!pdf) return; setSavedNote(undefined); void saveToComputer(pdf.blob, filename).then(outcome => setSavedNote(outcome === 'saved' ? c.saved : outcome === 'downloaded' ? c.downloaded : outcome === 'shared' ? c.shared : undefined)); }}><Download />{pdfLabel} · {matching.length} {c.pages}</Button> : <Button variant="outline" disabled={pdfState === 'busy' || !matching.length} onClick={() => preparePdf()}><Download />{pdfLabel} · {matching.length} {c.pages}</Button>}{pdfState === 'error' && <span role="alert" className="text-xs text-destructive">{c.failed}</span>}{savedNote && pdfState === 'ready' && <span className="text-xs text-muted-foreground">{savedNote}</span>}</div></div>
      {active.slug === 'locks' ? <p className="mt-4 text-sm text-muted-foreground">{c.unpriced}</p> : <label className="mt-6 flex max-w-sm items-center gap-3 rounded-md border border-border px-3"><Search className="size-4 shrink-0 text-muted-foreground" /><input className="h-11 min-w-0 w-full bg-transparent text-sm outline-none" aria-label={c.search} placeholder={c.search} value={query} onChange={event => { setQuery(event.target.value); setPage(0); }} /></label>}
      {matching.length ? <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{matching.map(({ item, index }) => <article key={item.url} className="flex flex-col">
        <button className="group block w-full cursor-pointer overflow-hidden border border-border bg-muted" onClick={() => { setPage(matching.findIndex(m => m.index === index)); setEnlarged(true); }} aria-label={`${c.enlarge} — ${c.page} ${index + 1}`}>
          <CataloguePageImage src={(language === 'fr' && item.frUrl) || item.url} number={index + 1} alt={`${active.name[language]} — ${c.page} ${index + 1}`} width={item.width} height={item.height} className="aspect-[4/3] w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" />
        </button>
        <div className="mt-4 flex items-baseline justify-between gap-3"><h3 className="text-base font-medium">{active.name[language]} · {c.page} {index + 1}</h3><span className="whitespace-nowrap text-xs text-muted-foreground">{item.convertedPrices > 0 ? 'MAD / EUR' : c.onRequest}</span></div>
        <div className="mt-3 flex items-center justify-between gap-3"><Button variant="ghost" size="sm" className="px-0" onClick={() => { setPage(matching.findIndex(m => m.index === index)); setEnlarged(true); }}><Maximize2 />{c.enlarge}</Button><a className="eyebrow link-underline" href={`mailto:info@luxora.ma?subject=${encodeURIComponent(`${t.products.enquirySubject} — ${active.name[language]} — ${c.page} ${index + 1}`)}`}>{t.products.enquire}</a></div>
      </article>)}</div> : <p className="py-16 text-muted-foreground">{c.noResults}</p>}
      {current && <Dialog open={enlarged} onOpenChange={setEnlarged}><DialogContent className="max-h-[95dvh] max-w-[95vw] overflow-auto p-4"><DialogTitle>{active.name[language]} — {c.page} {current.index + 1}</DialogTitle><DialogDescription>{c.note}</DialogDescription>{pager}<CataloguePageImage src={(language === 'fr' && current.item.frUrl) || current.item.url} number={current.index + 1} alt={`${active.name[language]} — ${c.page} ${current.index + 1}`} width={current.item.width} height={current.item.height} className="h-auto w-full" />{pager}</DialogContent></Dialog>}
      <div className="mt-10"><Button variant="outline" onClick={() => select(inGroup ? topLevelCategories.find(item => item.slug === LOW_BUDGET) : undefined)}>{inGroup ? '← ' + lowBudgetGroup.tagline[language] : c.back}</Button></div>
    </section>}
    <p className="mt-12 text-xs leading-relaxed text-muted-foreground">{c.note}{inGroup && <> {c.lbNote}</>}</p>
  </div>;
}
