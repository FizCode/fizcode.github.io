/**
 * Events the presentation layout sends to slides, so interactive slides can react
 * without watching the DOM themselves.
 *
 * - `stepchange` (detail: { step }): the slide was shown, or a step was revealed or hidden.
 *   A slide is always shown at step 0.
 * - `slideleave`: the slide stopped being the current one.
 */
export interface StepChangeDetail {
	step: number;
}

export const STEP_CHANGE = 'stepchange';
export const SLIDE_LEAVE = 'slideleave';

export const onStepChange = (slide: HTMLElement, handler: (step: number) => void) =>
	slide.addEventListener(STEP_CHANGE, (e) => handler((e as CustomEvent<StepChangeDetail>).detail.step));

/** Runs `reset` whenever the slide's state should go back to its start: a step change or leaving it */
export const onSlideReset = (slide: HTMLElement, reset: () => void) => {
	slide.addEventListener(STEP_CHANGE, reset);
	slide.addEventListener(SLIDE_LEAVE, reset);
};

/**
 * Click handling for slides where clicking an item selects it:
 * clicking an item calls `onItem`; clicking anywhere else while something is selected calls
 * `onOutside` instead of letting the layout reveal the next step.
 */
export const onSlideClick = <T extends Element>(
	slide: HTMLElement,
	itemSelector: string,
	handlers: { onItem: (item: T) => void; onOutside: () => void; hasSelection: () => boolean },
) =>
	slide.addEventListener('click', (e) => {
		const item = (e.target as Element).closest<T>(itemSelector);
		if (item) {
			e.stopPropagation();
			handlers.onItem(item);
		} else if (handlers.hasSelection()) {
			e.stopPropagation();
			handlers.onOutside();
		}
	});

/**
 * Puts `className` on `element` while the slide's fragment with class `trigger` is revealed,
 * so a component can switch between a "before" and "after" look with plain CSS.
 */
export const toggleWithStep = (element: Element, trigger: string, className = 'after') => {
	const slide = element.closest<HTMLElement>('.slide')!;
	onStepChange(slide, () => {
		element.classList.toggle(className, !!slide.querySelector(`.${trigger}.visible`));
	});
};
