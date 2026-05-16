import { Kbd, KbdCombo } from '@/components/ui/kbd'

export default function Example() {
  return (
    <>
      <Kbd>K</Kbd>
      <KbdCombo keys={['Ctrl', 'K']} />
    </>
  )
}