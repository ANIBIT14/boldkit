import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperContent,
} from '@/components/ui/stepper'

export default function Example() {
  return (
    <Stepper>
      <StepperList>
        <StepperItem index={0}>
          <StepperTrigger />
        </StepperItem>
        <StepperSeparator />
        <StepperItem index={1}>
          <StepperTrigger />
        </StepperItem>
        <StepperSeparator />
        <StepperItem index={2}>
          <StepperTrigger />
        </StepperItem>
      </StepperList>
      <StepperContent index={0}>Step 1 content</StepperContent>
      <StepperContent index={1}>Step 2 content</StepperContent>
      <StepperContent index={2}>Step 3 content</StepperContent>
    </Stepper>
  )
}