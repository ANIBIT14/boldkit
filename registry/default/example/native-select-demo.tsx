import { NativeSelect } from '@/components/ui/native-select'

export default function Example() {
  return (
    <NativeSelect className="max-w-xs" defaultValue="">
      <option value="" disabled>
        Select a fruit
      </option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </NativeSelect>
  )
}
