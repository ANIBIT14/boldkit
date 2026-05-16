import { Tour, type TourStep } from '@/components/ui/tour'

const steps: TourStep[] = [
  {
    target: '#step-1',
    title: 'Welcome',
    description: 'This is the first step of the tour.',
  },
  {
    target: '#step-2',
    title: 'Features',
    description: 'Here are some features.',
  },
]

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Start Tour</Button>
      <Tour steps={steps} open={open} onOpenChange={setOpen} />
    </>
  )
}