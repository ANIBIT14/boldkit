import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ComponentDoc, ExampleSection } from '@/components/docs/ComponentDoc'

const sourceCode = `import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }`

const usageCode = `import { AspectRatio } from '@/components/ui/aspect-ratio'

export default function Example() {
  return (
    <AspectRatio ratio={16 / 9}>
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
        alt="Photo"
        className="h-full w-full object-cover"
      />
    </AspectRatio>
  )
}`

export function AspectRatioDoc() {
  return (
    <>
      <ComponentDoc
        name="AspectRatio"
        description="Displays content within a desired ratio, perfect for images and videos with consistent dimensions."
        dependencies={['@radix-ui/react-aspect-ratio']}
        sourceCode={sourceCode}
        usageCode={usageCode}
      >
        <div className="w-full max-w-md border-3 border-foreground bk-shadow overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <img
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>
      </ComponentDoc>

      {/* 16:9 Ratio */}
      <ExampleSection
        title="16:9 Ratio"
        description="Common widescreen video ratio."
        code={`<AspectRatio ratio={16 / 9}>
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800"
    alt="Widescreen"
    className="h-full w-full object-cover"
  />
</AspectRatio>`}
      >
        <div className="w-full max-w-md border-3 border-foreground bk-shadow overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <img
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Widescreen photo"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>
      </ExampleSection>

      {/* 4:3 Ratio */}
      <ExampleSection
        title="4:3 Ratio"
        description="Classic television and photo ratio."
        code={`<AspectRatio ratio={4 / 3}>
  <img
    src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=600"
    alt="Classic ratio"
    className="h-full w-full object-cover"
  />
</AspectRatio>`}
      >
        <div className="w-full max-w-sm border-3 border-foreground bk-shadow overflow-hidden">
          <AspectRatio ratio={4 / 3}>
            <img
              src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=600&dpr=2&q=80"
              alt="Classic ratio photo"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>
      </ExampleSection>

      {/* Square 1:1 Ratio */}
      <ExampleSection
        title="Square (1:1)"
        description="Perfect square ratio for profile pictures and thumbnails."
        code={`<AspectRatio ratio={1}>
  <img
    src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400"
    alt="Square"
    className="h-full w-full object-cover"
  />
</AspectRatio>`}
      >
        <div className="w-48 border-3 border-foreground bk-shadow overflow-hidden">
          <AspectRatio ratio={1}>
            <img
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&dpr=2&q=80"
              alt="Square photo"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>
      </ExampleSection>

      {/* Portrait Ratio */}
      <ExampleSection
        title="Portrait (2:3)"
        description="Portrait orientation commonly used for posters and cards."
        code={`<AspectRatio ratio={2 / 3}>
  <img
    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
    alt="Portrait"
    className="h-full w-full object-cover"
  />
</AspectRatio>`}
      >
        <div className="w-48 border-3 border-foreground bk-shadow overflow-hidden">
          <AspectRatio ratio={2 / 3}>
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&dpr=2&q=80"
              alt="Portrait photo"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>
      </ExampleSection>

      {/* With Placeholder */}
      <ExampleSection
        title="With Placeholder"
        description="Use a background color as placeholder while content loads."
        code={`<AspectRatio ratio={16 / 9} className="bg-muted flex items-center justify-center">
  <span className="text-muted-foreground font-bold">16:9</span>
</AspectRatio>`}
      >
        <div className="w-full max-w-md border-3 border-foreground bk-shadow overflow-hidden">
          <AspectRatio ratio={16 / 9} className="bg-muted flex items-center justify-center">
            <span className="text-muted-foreground font-bold uppercase tracking-wide">16:9</span>
          </AspectRatio>
        </div>
      </ExampleSection>
    </>
  )
}
