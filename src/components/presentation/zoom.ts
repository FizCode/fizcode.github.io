import { onSlideReset } from './slide-events';

/** Largest zoom, so short blocks don't blow up to poster size */
const MAX_SCALE = 1.8;

/**
 * Size settings a slide may set around a zoomable element. The copy is shown outside that
 * context, so these are carried over; otherwise it renders at a different size than its box.
 */
const CARRIED_SETTINGS = ['--code-font'];

/**
 * Click-to-zoom for any element marked `data-zoomable` inside a slide: a click shows a large
 * copy centred over the dimmed slide; a click anywhere or Escape goes back. Changing the
 * slide or its step closes it too. Clicks here never reveal the next step.
 * An element holding step fragments zooms only once they are all revealed; until then a
 * click on it reveals the next step as usual.
 */
export function initZoom(slides: HTMLElement[]) {
	const closers: (() => void)[] = [];

	slides.forEach((slide) => {
		if (!slide.querySelector('[data-zoomable]')) return;

		const overlay = document.createElement('div');
		overlay.className = 'zoom-overlay';
		overlay.hidden = true;
		const stage = document.createElement('div');
		stage.className = 'zoom-stage';
		const hint = document.createElement('p');
		hint.className = 'zoom-hint';
		hint.textContent = 'Click anywhere to go back';
		overlay.append(stage, hint);
		slide.append(overlay);

		const close = () => {
			if (overlay.hidden) return;
			overlay.classList.remove('open');
			overlay.hidden = true;
			stage.replaceChildren();
		};

		const open = (element: HTMLElement) => {
			const size = element.getBoundingClientRect();
			// A copy keeps the slide's layout untouched; it keeps the element's width so text wraps the same
			const copy = element.cloneNode(true) as HTMLElement;
			copy.removeAttribute('data-zoomable');
			copy.style.width = `${size.width}px`;
			const style = getComputedStyle(element);
			CARRIED_SETTINGS.forEach((name) => {
				const value = style.getPropertyValue(name);
				if (value) copy.style.setProperty(name, value);
			});
			stage.replaceChildren(copy);
			overlay.hidden = false;

			const room = stage.parentElement!.getBoundingClientRect();
			const padding = getComputedStyle(overlay);
			const width = room.width - parseFloat(padding.paddingLeft) - parseFloat(padding.paddingRight);
			const height = room.height - parseFloat(padding.paddingTop) - parseFloat(padding.paddingBottom);
			stage.style.setProperty('--zoom', String(Math.min(width / size.width, height / size.height, MAX_SCALE)));
			requestAnimationFrame(() => overlay.classList.add('open'));
		};

		// Runs before the layout's "click reveals the next step", so it can stop it
		slide.addEventListener('click', (e) => {
			if (!overlay.hidden) {
				e.stopPropagation();
				close();
				return;
			}
			const element = (e.target as Element).closest<HTMLElement>('[data-zoomable]');
			if (element && !element.querySelector('.fragment:not(.visible)')) {
				e.stopPropagation();
				open(element);
			}
		});

		onSlideReset(slide, close);
		closers.push(close);
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closers.forEach((close) => close());
	});
}
