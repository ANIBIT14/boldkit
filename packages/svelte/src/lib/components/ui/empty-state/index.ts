import Root from "./empty-state.svelte";
import Icon from "./empty-state-icon.svelte";
import Title from "./empty-state-title.svelte";
import Description from "./empty-state-description.svelte";
import Actions from "./empty-state-actions.svelte";
import Illustration from "./empty-state-illustration.svelte";
import Preset from "./empty-state-preset.svelte";
export { emptyStateVariants } from "./empty-state-variants.js";
export type { PresetType } from "./empty-state-preset.svelte";

export {
	Root,
	Icon,
	Title,
	Description,
	Actions,
	Illustration,
	Preset,
	//
	Root as EmptyState,
	Icon as EmptyStateIcon,
	Title as EmptyStateTitle,
	Description as EmptyStateDescription,
	Actions as EmptyStateActions,
	Illustration as EmptyStateIllustration,
	Preset as EmptyStatePreset,
};
