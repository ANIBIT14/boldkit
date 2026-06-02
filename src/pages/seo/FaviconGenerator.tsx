import { SITE_URL } from '@/config/routes-meta'
import {
  SeoArticleLayout,
  Section,
  Callout,
  DataGrid,
  CTABox,
  LinkCards,
} from '@/components/seo/SeoArticleLayout'

const FAVGRAB = 'https://favgrab.boldkit.dev'

const TOC = [
  { id: 'what', label: 'What is a favicon' },
  { id: 'sizes', label: 'Sizes you need' },
  { id: 'how', label: 'How to generate' },
  { id: 'embed', label: 'HTML to add' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'What image size should I upload for a favicon?',
    answer:
      'Start from a square source image of at least 512×512 pixels. A larger square master downscales cleanly to every required size (16, 32, 180, 192, 512). Avoid uploading a small or non-square image - upscaling produces blurry icons.',
  },
  {
    question: 'Do I still need a favicon.ico file?',
    answer:
      'Yes, as a fallback. Modern browsers prefer PNG and SVG icons, but a multi-resolution favicon.ico (16/32/48) is still the safest default for older browsers and some crawlers. A good generator outputs both.',
  },
  {
    question: 'Is FavGrab free?',
    answer:
      'Yes. FavGrab is a free in-browser tool from the BoldKit team for extracting favicons from any website and converting images between favicon formats - no signup required.',
  },
]

export function FaviconGenerator() {
  return (
    <SeoArticleLayout
      eyebrow="Free Tool"
      title="Favicon Generator"
      lede="Turn any PNG, JPG, or SVG into a complete favicon set - favicon.ico plus every PNG size modern browsers, iOS, Android, and PWAs expect. Here’s exactly what you need and how to make it."
      accent="#00D9A8"
      updated="June 2026"
      toc={TOC}
      seo={{
        title: 'Free Favicon Generator - PNG, ICO, SVG & App Icons',
        description:
          'Generate a complete favicon set from any image. Create favicon.ico plus 16, 32, 180, 192 and 512px PNGs for browsers, iOS, Android and PWAs. Free, in-browser, no signup.',
        canonical: `${SITE_URL}/tools/favicon-generator`,
        keywords:
          'favicon generator, favicon maker, create favicon, png to favicon, favicon.ico generator, app icon generator, free favicon tool',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'Favicon Generator' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="what" title="What is a favicon?">
        <p>
          A <strong>favicon</strong> (&ldquo;favorite icon&rdquo;) is the tiny square image that
          represents your site in browser tabs, bookmarks, history, search results, and on phone home
          screens when someone installs your web app. It is one of the smallest assets on your site and
          one of the highest-leverage for brand recognition - a missing or generic favicon makes a
          product look unfinished.
        </p>
        <Callout title="The fastest path" tone="#00D9A8">
          Already have a logo or an existing site? <a href={FAVGRAB} target="_blank" rel="noopener noreferrer">FavGrab</a>{' '}
          extracts the favicon from any URL and converts images into ready-to-ship favicon formats in
          your browser - no upload limits, no signup.
        </Callout>
      </Section>

      <Section id="sizes" title="The favicon sizes you actually need">
        <p>
          You don&rsquo;t need dozens of files. This compact set covers every mainstream browser and
          platform in 2026:
        </p>
        <DataGrid
          headers={['File', 'Size', 'Used for']}
          rows={[
            [<code>favicon.ico</code>, '16 / 32 / 48', 'Legacy browser + crawler fallback'],
            [<code>favicon-32x32.png</code>, '32×32', 'Standard browser tab'],
            [<code>favicon-16x16.png</code>, '16×16', 'Small tab / bookmark bar'],
            [<code>apple-touch-icon.png</code>, '180×180', 'iOS home screen'],
            [<code>icon-192.png</code>, '192×192', 'Android / PWA'],
            [<code>icon-512.png</code>, '512×512', 'PWA splash + install'],
            [<code>icon.svg</code>, 'vector', 'Crisp, future-proof modern browsers'],
          ]}
        />
        <p>
          Want the full breakdown with the exact <code>&lt;link&gt;</code> tags? See the{' '}
          <a href="/tools/favicon-sizes">favicon sizes &amp; formats cheat sheet</a>.
        </p>
      </Section>

      <Section id="how" title="How to generate your favicon">
        <ol className="ml-1 list-inside space-y-3">
          <li><strong>1. Start square.</strong> Use a 512×512 (or larger) square master image. Keep the artwork simple - fine detail vanishes at 16px.</li>
          <li><strong>2. Convert.</strong> Produce a multi-size <code>favicon.ico</code> plus the PNG set above. <a href={FAVGRAB} target="_blank" rel="noopener noreferrer">FavGrab</a> does this in the browser, or see the <a href="/tools/png-to-ico">PNG&nbsp;→&nbsp;ICO guide</a>.</li>
          <li><strong>3. Drop the files</strong> into your site&rsquo;s root / <code>public</code> folder.</li>
          <li><strong>4. Add the link tags</strong> (below) to your <code>&lt;head&gt;</code>.</li>
          <li><strong>5. Hard-refresh</strong> - favicons are aggressively cached, so test in a private window.</li>
        </ol>
        <CTABox
          title="Make your favicon with FavGrab"
          body="Extract a favicon from any website, or convert your own image into a complete favicon set - free, in-browser, no signup."
          href={FAVGRAB}
          cta="Open FavGrab"
          external
          tone="#00D9A8"
        />
      </Section>

      <Section id="embed" title="The HTML to add">
        <p>Reference every icon in your document <code>&lt;head&gt;</code>:</p>
        <pre className="my-4 overflow-x-auto border-3 border-foreground bg-foreground p-4 text-[13px] leading-relaxed text-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <code>{`<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/svg+xml" href="/icon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`}</code>
        </pre>
        <LinkCards
          items={[
            { to: '/tools/png-to-ico', label: 'PNG → ICO', desc: 'Convert a PNG into a multi-size favicon.ico.' },
            { to: '/tools/favicon-sizes', label: 'Favicon sizes', desc: 'Every size & format in one cheat sheet.' },
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
