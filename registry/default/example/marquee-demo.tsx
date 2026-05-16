import { Marquee, MarqueeItem, MarqueeSeparator } from '@/components/ui/marquee'

export default function Example() {
  return (
    <Marquee>
      <MarqueeItem>Welcome to BoldKit</MarqueeItem>
      <MarqueeSeparator />
      <MarqueeItem>Neubrutalism UI</MarqueeItem>
      <MarqueeSeparator />
      <MarqueeItem>Bold & Beautiful</MarqueeItem>
      <MarqueeSeparator />
    </Marquee>
  )
}