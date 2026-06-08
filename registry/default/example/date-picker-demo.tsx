import { useState } from 'react'
import { DatePicker } from '@/components/ui/date-picker'

export default function Example() {
  const [date, setDate] = useState<Date | undefined>()

  return <DatePicker value={date} onChange={setDate} />
}
