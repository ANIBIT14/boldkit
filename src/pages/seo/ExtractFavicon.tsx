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
  { id: 'why', label: 'Why extract a favicon' },
  { id: 'fastest', label: 'The fastest way' },
  { id: 'manual', label: 'Manual methods' },
  { id: 'format', label: 'Format & cleanup' },
  { id: 'ethics', label: 'Ethics & licensing' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'How do I download a favicon from a website?',
    answer:
      'The quickest way is FavGrab - paste the site’s URL and it fetches and lets you download every icon the page exposes. If you’d rather do it by hand, append /favicon.ico to the domain (e.g. https://example.com/favicon.ico) and save the file your browser loads.',
  },
  {
    question: 'Can I get a high-res favicon?',
    answer:
      'Often, yes. The /favicon.ico path usually returns a low-res 16/32px ICO, but many sites declare a much larger icon in their page <link> tags - view-source and look for apple-touch-icon (typically 180×180 PNG) or an SVG icon, which scales infinitely. FavGrab surfaces all of these so you can grab the largest one.',
  },
  {
    question: 'Is it legal to extract a favicon?',
    answer:
      'For research, references, your own bookmarks, or a links UI - yes, that’s normal fair use. A favicon is usually a trademarked brand logo, so what’s not OK is passing another brand’s icon off as your own or using it to impersonate them. Extract freely; just don’t misrepresent.',
  },
]

export function ExtractFavicon() {
  return (
    <SeoArticleLayout
      eyebrow="How-To"
      title="Extract a Favicon From Any Website"
      lede="You can grab any site’s favicon in seconds - here are several ways to do it, from a one-paste tool to a handful of manual URL tricks."
      accent="#C084FC"
      updated="June 2026"
      toc={TOC}
      seo={{
        title: 'How to Extract a Favicon From Any Website',
        description:
          'Five ways to grab the favicon from any website - FavGrab, the /favicon.ico path, Google’s favicon endpoint, the page’s link tags and more - plus the formats you get and an ethics note.',
        canonical: `${SITE_URL}/tools/extract-favicon`,
        keywords:
          'extract favicon, download favicon, get favicon from website, favicon from url, favicon grabber, favicon extractor',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Tools', url: `${SITE_URL}/tools` },
          { name: 'Extract Favicon' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="why" title="Why extract a favicon">
        <p>
          Pulling the icon off a live site is a surprisingly common need. A few reasons you might want to:
        </p>
        <ul className="ml-1 space-y-2">
          <li><strong>Competitive research &amp; moodboards</strong> - collect a wall of competitor marks to compare brand styling at a glance.</li>
          <li><strong>Rebuilding a lost asset</strong> - the live favicon is shipped even when the original source file has gone missing from the repo.</li>
          <li><strong>Building a links / bookmarks UI</strong> - show a real icon next to every saved URL instead of a generic globe.</li>
          <li><strong>Design references</strong> - study how others solve recognizable artwork inside a 16px square.</li>
        </ul>
        <p>
          Whatever the reason, the goal is the same: get the highest-quality version of the icon the site
          will hand you.
        </p>
      </Section>

      <Section id="fastest" title="The fastest way: FavGrab">
        <p>
          The quickest path is to skip the manual hunting entirely.{' '}
          <a href={FAVGRAB} target="_blank" rel="noopener noreferrer">FavGrab</a> takes a URL, fetches all
          the icons that site exposes - the <code>favicon.ico</code>, the PNGs and SVG declared in its{' '}
          <code>&lt;link&gt;</code> tags, the apple-touch-icon - and lets you download or convert any
          of them. It runs entirely in your browser, it&rsquo;s free, and there&rsquo;s no signup.
        </p>
        <Callout title="One paste, every icon" tone="#C084FC">
          Drop in a URL and FavGrab shows you each icon the page declares, at its real resolution, so you
          can pick the crispest one instead of settling for a blurry 16px ICO.
        </Callout>
        <CTABox
          title="Extract any favicon"
          body="Paste a URL and FavGrab fetches every icon the site exposes - download or convert any of them, free and in-browser."
          href={FAVGRAB}
          cta="Open FavGrab"
          external
          tone="#C084FC"
        />
      </Section>

      <Section id="manual" title="Manual methods">
        <p>
          Prefer to do it by hand? These four approaches cover almost every site. Each trades convenience
          for control:
        </p>
        <DataGrid
          headers={['Method', 'How', 'Notes']}
          rows={[
            [
              'Direct path',
              <>Visit <code>https://example.com/favicon.ico</code> in the address bar and save the image.</>,
              'Most sites still serve this. Usually a small 16/32 ICO.',
            ],
            [
              'Page <link> tags',
              <>View-source and look for <code>&lt;link rel="icon" ...&gt;</code> or <code>apple-touch-icon</code> hrefs.</>,
              'Often the highest-res - PNG or SVG, up to 180×180+.',
            ],
            [
              'Google endpoint',
              <><code>https://www.google.com/s2/favicons?domain=example.com&amp;sz=128</code></>,
              'Resizable via sz; great for quick thumbnails.',
            ],
            [
              'DuckDuckGo',
              <><code>https://icons.duckduckgo.com/ip3/example.com.ico</code></>,
              'Simple, cached; returns the site’s icon by domain.',
            ],
          ]}
        />
        <p>The URL patterns, ready to copy and swap in a domain:</p>
        <pre className="my-4 overflow-x-auto border-3 border-foreground bg-foreground p-4 text-[13px] leading-relaxed text-background shadow-[4px_4px_0px_hsl(var(--shadow-color))]">
          <code>{`# Direct path (served by most sites)
https://example.com/favicon.ico

# Look in the page source for declared icons
<link rel="icon" href="...">
<link rel="apple-touch-icon" href="...">

# Google favicon endpoint (resizable)
https://www.google.com/s2/favicons?domain=example.com&sz=128

# DuckDuckGo favicon endpoint
https://icons.duckduckgo.com/ip3/example.com.ico`}</code>
        </pre>
      </Section>

      <Section id="format" title="Which format you get & cleanup">
        <p>
          What you grab depends on the method. The <strong>direct path</strong> usually hands you a
          low-res 16 or 32px <code>favicon.ico</code> - fine for a thumbnail, but soft if you scale
          it up. The <strong>page&rsquo;s link tags</strong> are where the good stuff lives: a crisp
          <code> apple-touch-icon</code> PNG at 180×180, or an <code>icon.svg</code> that scales to any
          size without loss.
        </p>
        <p>
          Once you&rsquo;ve grabbed the best source, you may want to rebuild a complete favicon set from
          it rather than ship a single odd-sized file. To turn one good image into every required size,
          use the <a href="/tools/favicon-generator">favicon generator</a>; to bundle PNGs back into a
          multi-resolution ICO, see <a href="/tools/png-to-ico">PNG&nbsp;→&nbsp;ICO</a>.
        </p>
      </Section>

      <Section id="ethics" title="Ethics & licensing">
        <p>
          One thing worth saying plainly before you start collecting other people&rsquo;s icons:
        </p>
        <Callout title="Respect the trademark" tone="#C084FC">
          A favicon is almost always a <strong>trademark or brand logo</strong>. It&rsquo;s completely
          fine to extract one for research, design references, or your own bookmarks and link UIs. It is{' '}
          <strong>not</strong> fine to pass another brand&rsquo;s icon off as your own, or to use it to
          impersonate them. Grab freely; don&rsquo;t misrepresent.
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
        <LinkCards
          items={[
            { to: '/tools/favicon-generator', label: 'Favicon generator', desc: 'Turn one image into a complete favicon set.' },
            { to: '/tools/png-to-ico', label: 'PNG → ICO', desc: 'Bundle PNGs into a multi-size favicon.ico.' },
            { to: '/tools/favicon-sizes', label: 'Favicon sizes', desc: 'Every size & format in one cheat sheet.' },
            { to: FAVGRAB, label: 'FavGrab', desc: 'The free favicon + image tool itself.', external: true },
          ]}
        />
      </Section>
    </SeoArticleLayout>
  )
}
