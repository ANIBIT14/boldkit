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
  { id: 'intro', label: 'The toolbox' },
  { id: 'favicon', label: 'Favicon & images' },
  { id: 'design', label: 'Design & build' },
  { id: 'summary', label: 'All tools' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    question: 'Are BoldKit tools free?',
    answer:
      'Yes - every tool listed here is completely free with no signup, no account, and no upload limits. They run in your browser as part of the open-source BoldKit project, so there is nothing to pay for and nothing to install.',
  },
  {
    question: 'Do I need an account for FavGrab?',
    answer:
      'No. FavGrab runs entirely in your browser - favicon extraction and image conversion happen client-side, so your images never leave your machine. There is no login, no email, and no usage cap.',
  },
  {
    question: 'Can I use these tools commercially?',
    answer:
      'Yes. BoldKit and its tools are free under the MIT license. Anything you generate - favicons, pixel art, themes, shapes, canvas backgrounds - is yours to use in commercial and client work with no attribution required.',
  },
]

export function ToolsHub() {
  return (
    <SeoArticleLayout
      eyebrow="Free Tools"
      title="BoldKit Tools"
      lede="Free, no-signup, in-browser tools for builders - favicon extraction, pixel art, themes, shapes, and animated backgrounds, all running client-side."
      accent="#FFE400"
      updated="June 2026"
      toc={TOC}
      seo={{
        title: 'Free Brutalist Web Tools',
        description:
          'Free in-browser tools from BoldKit - FavGrab favicon extractor & image converter, Dot Matrix Studio, Theme Builder, Shape Builder, Canvas Effects and ASCII Shapes.',
        canonical: `${SITE_URL}/tools`,
        keywords:
          'free web tools, favicon tool, brutalist tools, boldkit tools, favicon generator, theme builder, pixel art tool',
        breadcrumbs: [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Tools' },
        ],
        faq: FAQ,
      }}
    >
      <Section id="intro" title="A toolbox, not a paywall">
        <p>
          BoldKit ships a growing set of <strong>free, zero-signup, in-browser tools</strong> alongside
          the component library. No accounts, no upload limits, no &ldquo;export blocked until you
          upgrade&rdquo; - everything runs client-side and the output is yours to keep. Whether you need a
          favicon, a pixel-art loop, a custom theme, or an animated background, there&rsquo;s a tool here
          for it.
        </p>
        <Callout title="Newest tool" tone="#FFE400">
          <a href={FAVGRAB} target="_blank" rel="noopener noreferrer">FavGrab</a> is the latest addition
          - a free favicon <strong>extractor</strong> that pulls the icon from any live site, plus an
          <strong> image converter</strong> for favicon formats. Runs entirely in your browser at{' '}
          <a href={FAVGRAB} target="_blank" rel="noopener noreferrer">favgrab.boldkit.dev</a>.
        </Callout>
      </Section>

      <Section id="favicon" title="Favicon & image tools">
        <p>
          Start with <a href={FAVGRAB} target="_blank" rel="noopener noreferrer">FavGrab</a> for the
          actual conversion work, then use the guides below for the exact sizes, tags, and formats you
          need to ship a complete icon set.
        </p>
        <LinkCards
          items={[
            { to: FAVGRAB, label: 'FavGrab', desc: 'Extract favicons from any site + convert images.', external: true },
            { to: '/tools/favicon-generator', label: 'Favicon Generator', desc: 'Turn any image into a full favicon set.' },
            { to: '/tools/png-to-ico', label: 'PNG → ICO', desc: 'Convert a PNG into a multi-size favicon.ico.' },
            { to: '/tools/favicon-sizes', label: 'Favicon Sizes', desc: 'Every size & format in one cheat sheet.' },
            { to: '/tools/extract-favicon', label: 'Extract a Favicon', desc: 'Grab the icon from any live website.' },
          ]}
        />
      </Section>

      <Section id="design" title="Design & build tools">
        <p>
          The rest of the toolbox is for making things look unmistakably neubrutalist - sprite editors,
          theme tweaking, shape customization, and animated backdrops you can drop straight into a page.
        </p>
        <LinkCards
          items={[
            { to: '/studio', label: 'Dot Matrix Studio', desc: 'Pixel art & frame animation editor - export WebM, PNG, or SVG.' },
            { to: '/themes', label: 'Theme Builder', desc: 'Tweak CSS variables live, then copy the whole theme.' },
            { to: '/shapes/builder', label: 'Shape Builder', desc: 'Customize any of the 45 SVG shapes and copy the markup.' },
            { to: '/canvas-effects', label: 'Canvas Effects', desc: '19 animated canvas backgrounds, ready to paste.' },
            { to: '/ascii-shapes', label: 'ASCII Shapes', desc: 'Animated ASCII art for terminals and brutalist headers.' },
          ]}
        />
      </Section>

      <Section id="summary" title="Every tool at a glance">
        <p>One row per tool - what it does, and what it costs (spoiler: nothing).</p>
        <DataGrid
          headers={['Tool', 'What it does', 'Cost']}
          rows={[
            [<a href={FAVGRAB} target="_blank" rel="noopener noreferrer">FavGrab</a>, 'Favicon extractor + image converter', 'Free'],
            ['Dot Matrix Studio', 'Pixel art & frame animation (WebM/PNG/SVG)', 'Free'],
            ['Theme Builder', 'Live CSS-variable editor + copy theme', 'Free'],
            ['Shape Builder', 'Customize SVG shapes', 'Free'],
            ['Canvas Effects', '19 animated canvas backgrounds', 'Free'],
            ['ASCII Shapes', 'Animated ASCII art', 'Free'],
          ]}
        />
      </Section>

      <CTABox
        title="Grab a favicon now"
        body="Pull the favicon from any website or convert your own image into a complete icon set - free, in-browser, no signup."
        href={FAVGRAB}
        cta="Open FavGrab"
        external
        tone="#FFE400"
      />

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
