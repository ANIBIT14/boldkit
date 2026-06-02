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
  { id: 'what', label: 'What is an ICO file' },
  { id: 'compare', label: 'PNG vs ICO' },
  { id: 'how', label: 'How to convert' },
  { id: 'embed', label: 'Add it to your site' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'Can I convert PNG to ICO online for free?',
    answer:
      'Yes. FavGrab is a free in-browser tool from the BoldKit team that converts a PNG into a multi-resolution favicon.ico - no upload, no signup, and your image never leaves your machine because the conversion runs entirely in the browser.',
  },
  {
    question: 'What size PNG do I need?',
    answer:
      'Start from a square PNG of at least 256×256 pixels, ideally 512×512. A larger square master downscales cleanly to the 16, 32 and 48px frames packed inside the .ico. A small or non-square source upscales badly and produces a blurry icon.',
  },
  {
    question: 'Do I still need ICO in 2026?',
    answer:
      'Yes, as a fallback. Modern browsers prefer PNG and SVG icons, but a multi-resolution favicon.ico (16/32/48) at your site root is still the safest default for older browsers and some crawlers. Ship favicon.ico alongside PNG/SVG and you cover everything.',
  },
]

export function PngToIco() {
  return (
    <SeoArticleLayout
      eyebrow="Converter"
      title="Convert PNG to ICO"
      lede="Turn a single square PNG into a multi-resolution favicon.ico that packs the 16, 32, and 48px icon frames browsers and crawlers expect - free, in your browser."
      accent="#FF3B6E"
      updated="June 2026"
      toc={TOC}
      seo={{
        title: 'Convert PNG to ICO - Free Favicon Converter',
        description:
          'Convert a PNG into a multi-resolution favicon.ico (16/32/48) for free in your browser. What ICO is, PNG vs ICO, step-by-step conversion, and the exact link tag to add.',
        canonical: `${SITE_URL}/tools/png-to-ico`,
        keywords:
          'png to ico, convert png to ico, png to favicon, ico converter, favicon.ico from png',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'PNG to ICO' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="what" title="What is an ICO file?">
        <p>
          An <strong>ICO</strong> file is the Windows icon container format. Its defining feature is that a
          single <code>.ico</code> can hold <strong>multiple resolutions in one file</strong> -
          most commonly <code>16×16</code>, <code>32×32</code>, and <code>48×48</code>. The browser or
          operating system picks the frame that best fits where the icon is shown, whether that&rsquo;s a
          cramped tab, a bookmark bar, or a larger list view.
        </p>
        <p>
          That bundling is exactly why <code>favicon.ico</code> has survived for decades. Even though
          modern browsers now prefer crisp PNG and SVG icons, a multi-resolution{' '}
          <code>favicon.ico</code> remains the <strong>safest fallback</strong> for older browsers and
          some crawlers - many of which still request <code>/favicon.ico</code> by convention before
          they ever read your <code>&lt;head&gt;</code>.
        </p>
        <Callout title="In one line" tone="#FF3B6E">
          ICO is a container that stores several icon sizes in one file. <code>favicon.ico</code> is the
          legacy fallback you still ship even in 2026 - just pair it with modern PNG/SVG icons.
        </Callout>
      </Section>

      <Section id="compare" title="PNG vs ICO">
        <p>
          Both formats are valid favicon sources, but they solve different problems. Here&rsquo;s how they
          stack up:
        </p>
        <DataGrid
          headers={['Aspect', 'PNG', 'ICO']}
          rows={[
            [
              'Resolutions per file',
              'Single resolution - one PNG per size',
              'Multiple resolutions bundled (e.g. 16 / 32 / 48)',
            ],
            [
              'Transparency',
              'Full alpha channel',
              'Full alpha channel (modern ICO)',
            ],
            [
              'Browser support',
              'All modern browsers; preferred today',
              'Universal, including legacy browsers + crawlers',
            ],
            [
              'When to use',
              'Sharp icons for modern browsers, iOS, Android, PWAs',
              'Root /favicon.ico fallback for everything else',
            ],
          ]}
        />
        <p>
          The practical takeaway: it isn&rsquo;t either/or. <strong>Ship a favicon.ico</strong> for the
          legacy fallback <strong>and</strong> a set of PNGs (plus an SVG) for modern browsers. That
          combination covers every client without compromise - see the{' '}
          <a href="/tools/favicon-sizes">favicon sizes &amp; formats cheat sheet</a> for the full set.
        </p>
      </Section>

      <Section id="how" title="How to convert PNG → ICO">
        <ol className="ml-1 list-inside space-y-3">
          <li><strong>1. Start from a square PNG.</strong> Use a source that is at least <code>256×256</code>, ideally <code>512×512</code>. Square in, square out - a non-square image gets distorted or padded.</li>
          <li><strong>2. Convert to a multi-size .ico.</strong> Generate one <code>favicon.ico</code> that packs the <code>16</code>, <code>32</code>, and <code>48px</code> frames, so a single file serves every legacy context.</li>
          <li><strong>3. Keep the artwork simple.</strong> Fine detail disappears at 16px. Bold shapes and high contrast survive the downscale; thin lines and small text don&rsquo;t.</li>
          <li><strong>4. Drop it in place.</strong> Save the result as <code>favicon.ico</code> at your site root or <code>public</code> folder, then add the link tag below.</li>
        </ol>
        <p>
          <a href={FAVGRAB} target="_blank" rel="noopener noreferrer">FavGrab</a> does the whole
          conversion <strong>in your browser</strong> - drop in a PNG, get a multi-resolution{' '}
          <code>favicon.ico</code> back, with nothing uploaded to a server.
        </p>
        <CTABox
          title="Convert PNG to ICO"
          body="Drop in a square PNG and get a multi-resolution favicon.ico (16/32/48) back - free, in-browser, no signup, nothing uploaded."
          href={FAVGRAB}
          cta="Open FavGrab"
          external
          tone="#FF3B6E"
        />
      </Section>

      <Section id="embed" title="Add it to your site">
        <p>
          Drop your <code>favicon.ico</code> into your site&rsquo;s root or <code>public</code> folder,
          then reference it in your document <code>&lt;head&gt;</code>:
        </p>
        <pre className="my-4 overflow-x-auto border-3 border-foreground bg-foreground p-4 text-[13px] leading-relaxed text-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <code>{`<link rel="icon" href="/favicon.ico" sizes="any" />`}</code>
        </pre>
        <p>
          The <code>sizes="any"</code> hint tells the browser this one file covers multiple resolutions.
          For the best result in modern browsers, pair the <code>.ico</code> with a PNG and an SVG icon so
          newer clients get a sharper render - the{' '}
          <a href="/tools/favicon-sizes">favicon sizes &amp; formats cheat sheet</a> lists the full set of
          link tags to add alongside this one.
        </p>
        <LinkCards
          items={[
            { to: '/tools/favicon-generator', label: 'Favicon generator', desc: 'Turn any image into a complete favicon set.' },
            { to: '/tools/favicon-sizes', label: 'Favicon sizes', desc: 'Every size & format in one cheat sheet.' },
            { to: '/tools/extract-favicon', label: 'Extract a favicon', desc: 'Grab the icon from any live website.' },
            { to: FAVGRAB, label: 'FavGrab', desc: 'The free favicon + image tool itself.', external: true },
          ]}
        />
      </Section>

      <Section id="troubleshooting" title="Troubleshooting">
        <Callout title="Common conversion issues" tone="#FF3B6E">
          <ul className="ml-1 space-y-2">
            <li><strong>Blurry icon?</strong> Your source was upscaled from something too small. Start from a larger square master (256px minimum, 512px ideal) and convert <em>down</em>, never up.</li>
            <li><strong>Transparency lost?</strong> Check that your PNG actually has an alpha channel and wasn&rsquo;t flattened onto a solid background before conversion. A white box behind the icon usually means it was flattened.</li>
            <li><strong>Not updating?</strong> Favicons cache hard. After deploying a new <code>favicon.ico</code>, test in a private / incognito window or hard-refresh - the old icon often lingers in a normal tab.</li>
          </ul>
        </Callout>
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
