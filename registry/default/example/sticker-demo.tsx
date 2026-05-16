import { Sticker, Stamp } from '@/components/ui/sticker'

export default function Example() {
  return (
    <div className="flex gap-8 items-center">
      <Sticker>New</Sticker>
      <Stamp>Approved</Stamp>
    </div>
  )
}