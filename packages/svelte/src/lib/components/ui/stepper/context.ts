import { getContext, setContext } from 'svelte';

export type StepperContext = {
	activeStep: () => number;
	setActiveStep: (step: number) => void;
	orientation: 'horizontal' | 'vertical';
};

export type StepperItemContext = {
	index: number;
};

const STEPPER_CTX = Symbol('stepper');
const STEPPER_ITEM_CTX = Symbol('stepper-item');

export function setStepperContext(ctx: StepperContext) {
	setContext(STEPPER_CTX, ctx);
}

export function getStepperContext() {
	return getContext<StepperContext>(STEPPER_CTX);
}

export function setStepperItemContext(ctx: StepperItemContext) {
	setContext(STEPPER_ITEM_CTX, ctx);
}

export function getStepperItemContext() {
	return getContext<StepperItemContext>(STEPPER_ITEM_CTX);
}
