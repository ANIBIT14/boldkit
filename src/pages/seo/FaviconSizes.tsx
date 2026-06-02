import { SITE_URL } from '@/config/routes-meta'
import {
  SeoArticleLayout,
  Section,
  Callout,
  DataGrid,
  DoDont,
  CTABox,
  LinkCards,
} from '@/components/seo/SeoArticleLayout'

const FAVGRAB = 'https://favgrab.boldkit.dev'

const TOC = [
  { id: 'short', label: 'The short answer' },
  { id: 'table', label: 'Full size table' },
  { id: 'minimal', label: 'Minimal vs legacy' },
  { id: 'html', label: 'The exact HTML' },
  { id: 'mistakes', label: 'Common mistakes' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'What favicon sizes do I need in 2026?',
    answer:
      'A small set covers everything: a multi-resolution favicon.ico (16/32/48), a 32×32 PNG, an apple-touch-icon at 180×180, and 192×192 plus 512×512 PNGs for PWA/Android. Add an icon.svg for crisp vector rendering and you are done - there is no need for 20+ separate files.',
  },
  {
    question: 'What size is the Apple touch icon?',
    answer:
      'The apple-touch-icon is 180×180 pixels. iOS uses it for the home-screen icon when someone adds your site to their home screen. Export it as a PNG with no transparency - give it a solid background, because iOS fills transparent pixels with black.',
  },
  {
    question: 'Do I need a 512px icon?',
    answer:
      'Yes, if you ship a web app manifest. The 512×512 PNG is required for the PWA install prompt and the Android splash screen; the 192×192 covers the home-screen icon. Skip the 512 and installable PWAs lose their high-resolution install and splash artwork.',
  },
]

export function FaviconSizes() {
  return (
    <SeoArticleLayout
      eyebrow="Cheat Sheet"
      title="Favicon Sizes & Formats"
      lede="The exact favicon sizes and formats that still matter in 2026 - 16, 32, 180, 192 and 512px across ICO, PNG and SVG - plus the legacy files you can safely skip."
      accent="#00D9A8"
      updated="June 2026"
      toc={TOC}
      seo={{
        title: 'Favicon Sizes & Formats Cheat Sheet (2026)',
        description:
          'Every favicon size and format you need in 2026 - 16, 32, 180, 192, 512px, ICO, PNG and SVG - with the exact HTML link tags and the modern minimal set vs the legacy set.',
        canonical: `${SITE_URL}/tools/favicon-sizes`,
        keywords:
          'favicon sizes, favicon size, favicon dimensions, apple touch icon size, favicon formats, favicon cheat sheet',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'Favicon Sizes' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="short" title="The short answer">
        <p>
          You don&rsquo;t need a folder full of icons. A handful of files covers every mainstream
          browser, iOS, Android, and installable PWAs in 2026 - everything else is legacy weight.
        </p>
        <Callout title="The set you actually ship" tone="#00D9A8">
          <code>favicon.ico</code> (16/32/48), <code>favicon-32x32.png</code>,{' '}
          <code>favicon-16x16.png</code>, <code>apple-touch-icon.png</code> (180×180),{' '}
          <code>icon-192.png</code> and <code>icon-512.png</code> for PWAs - plus an optional{' '}
          <code>icon.svg</code> for crisp vector rendering. That&rsquo;s it.
        </Callout>
      </Section>

      <Section id="table" title="The full size table">
        <p>
          Here is every file in the recommended set, what dimensions it holds, the format to export,
          and the job it does:
        </p>
        <DataGrid
          headers={['File', 'Size', 'Format', 'Purpose']}
          rows={[
            [<code>favicon.ico</code>, '16 / 32 / 48', 'ICO', 'Legacy browser + crawler fallback'],
            [<code>favicon-16x16.png</code>, '16×16', 'PNG', 'Small tab / bookmark bar'],
            [<code>favicon-32x32.png</code>, '32×32', 'PNG', 'Standard browser tab'],
            [<code>apple-touch-icon.png</code>, '180×180', 'PNG', 'iOS home screen - no transparency, solid bg'],
            [<code>icon-192.png</code>, '192×192', 'PNG', 'Android / PWA home-screen icon'],
            [<code>icon-512.png</code>, '512×512', 'PNG', 'PWA install prompt + splash'],
            [<code>icon.svg</code>, 'vector', 'SVG', 'Modern crisp, resolution-independent'],
          ]}
        />
        <p>
          Export everything from one square master of at least <code>512×512</code> so each size
          downscales cleanly. Need help making them? See the{' '}
          <a href="/tools/favicon-generator">favicon generator</a>.
        </p>
      </Section>

      <Section id="minimal" title="Modern minimal set vs. legacy">
        <p>
          For years the advice was to export 20+ icons - a separate PNG for every iOS device,
          Windows tiles, and a pile of <code>apple-touch-icon-*</code> variants. In 2026 that&rsquo;s
          overkill. Browsers downscale, iOS reads a single <code>apple-touch-icon</code>, and the web
          manifest handles Android and PWAs. The <strong>minimal set</strong> is ICO + SVG + a 32 PNG +
          apple-touch-icon + 192/512 for PWA.
        </p>
        <DataGrid
          headers={['Approach', 'Files', 'Verdict']}
          rows={[
            [
              <strong>Modern minimal (2026)</strong>,
              <code>.ico</code>,
              'Recommended - covers every real platform',
            ],
            [
              <span>Modern minimal</span>,
              <span><code>icon.svg</code> + 32 PNG + 180 + 192/512</span>,
              'Lean, fast, future-proof',
            ],
            [
              <strong>Legacy &ldquo;20+ icons&rdquo;</strong>,
              <span>Per-device PNGs, Windows tiles, MS config</span>,
              'Overkill - extra weight, no real benefit',
            ],
          ]}
        />
        <p>
          The SVG is the modern win: one vector file renders crisp at any density. Keep the ICO purely
          as a fallback for old browsers and crawlers that ignore PNG and SVG icons.
        </p>
      </Section>

      <Section id="html" title="The exact HTML">
        <p>
          Drop these link tags into your document <code>&lt;head&gt;</code> - ICO with{' '}
          <code>sizes=&quot;any&quot;</code>, the SVG, the 32 and 16 PNGs, the apple-touch-icon, and
          the manifest:
        </p>
        <pre className="my-4 overflow-x-auto border-3 border-foreground bg-foreground p-4 text-[13px] leading-relaxed text-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <code>{`<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/svg+xml" href="/icon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`}</code>
        </pre>
        <p>
          The <code>192×192</code> and <code>512×512</code> icons are not referenced with{' '}
          <code>&lt;link&gt;</code> tags - they belong in the web app manifest&rsquo;s{' '}
          <code>icons</code> array, which the <code>&lt;link rel=&quot;manifest&quot;&gt;</code> above
          points to:
        </p>
        <pre className="my-4 overflow-x-auto border-3 border-foreground bg-foreground p-4 text-[13px] leading-relaxed text-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <code>{`{
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}`}</code>
        </pre>
      </Section>

      <Section id="mistakes" title="Common mistakes">
        <p>
          Most broken favicons come from a few repeat offenders. Avoid these and your icon set will
          render correctly everywhere:
        </p>
        <DoDont
          doItems={[
            'Start from a square source - non-square art gets stretched or letterboxed.',
            'Give the apple-touch-icon a solid background - iOS fills transparency with black.',
            'Ship icon-512.png - the PWA install prompt and splash screen require it.',
            'Hard-refresh in a private window - favicons are cached aggressively.',
            'Keep one square ≥512px master so every size downscales cleanly.',
          ]}
          dontItems={[
            'Upload a tiny or non-square image and let it upscale blurry.',
            'Use a transparent apple-touch-icon and get a black box on iOS.',
            'Forget the 512px icon and break installable PWAs.',
            'Assume a swapped file shows instantly - stale cache hides the change.',
            'Ship 20+ legacy per-device icons you no longer need.',
          ]}
        />
        <CTABox
          title="Generate every size at once"
          body="Skip the manual exporting. FavGrab turns one image into the complete favicon set - ICO, every PNG size, and SVG - free, in-browser, no signup."
          href={FAVGRAB}
          cta="Open FavGrab"
          external
          tone="#00D9A8"
        />
        <LinkCards
          items={[
            { to: '/tools/favicon-generator', label: 'Favicon generator', desc: 'Turn any image into a full favicon set.' },
            { to: '/tools/png-to-ico', label: 'PNG → ICO', desc: 'Convert a PNG into a multi-size favicon.ico.' },
            { to: '/tools/extract-favicon', label: 'Extract a favicon', desc: 'Grab the icon from any live website.' },
            { to: FAVGRAB, label: 'FavGrab', desc: 'The free favicon + image tool itself.', external: true },
          ]}
        />
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <div className="space-y-5">
          {FAQ.map(item => (
            <div key={item.question}>
              <h3 className="text-lg font-bold text-foreground">{item.question}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-foreground/75">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>
    </SeoArticleLayout>
  )
}
