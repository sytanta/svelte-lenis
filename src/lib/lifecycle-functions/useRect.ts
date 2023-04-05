import { onMount } from 'svelte';
// import { throttle } from 'throttle-debounce';

// import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export interface Rect {
	height: number;
	width: number;
	top: number;
	left: number;
}

const DEFAULT_RECT = { height: 0, width: 0, top: 0, left: 0 };

export function useRect(lazy: boolean = false, debounce = 1000) {
	let node: HTMLElement | null;
	let resizeObserver: ResizeObserver;

	const rectStore = writable<Rect>(DEFAULT_RECT);
	const lazyRectStore = writable<Rect>(DEFAULT_RECT);

	const getRect = () => lazyRectStore;

	const resize = () => {
		const top = offsetTop(node);
		const left = offsetLeft(node);

		let newRect: Rect;
		lazyRectStore.update((pre) => {
			newRect = Object.assign({}, pre, { top, left });

			if (!lazy) {
				rectStore.set(newRect);
			}

			return newRect;
		});
	};

	let onResizeObserver = (entries: ResizeObserverEntry[]) => {
		const [entry] = entries;
		const { width, height } = entry.contentRect;

		let newRect: Rect;
		lazyRectStore.update((pre) => {
			newRect = Object.assign({}, pre, { width, height });

			if (!lazy) {
				rectStore.set(newRect);
			}

			return newRect;
		});
	};

	const unobserve = () => {
		if (node) resizeObserver?.unobserve(node);
		resizeObserver?.unobserve(document.body);
		resizeObserver?.disconnect();
	};

	const setRef = (elm: HTMLElement) => {
		if (!elm || elm === node) return;
		node = elm;

		unobserve();
		resize();

		resizeObserver = new ResizeObserver(onResizeObserver);
		resizeObserver.observe(node);

		// node.dispatchEvent(new Event('resize'));
	};

	// Observer "document.body" by default
	// let callback: throttle<() => void>;
	// if (browser) {
	// 	let callback = throttle(debounce, resize);
	// 	resizeObserver = new ResizeObserver(callback);
	// 	resizeObserver.observe(document.body);
	// }

	onMount(() => {
		return () => {
			unobserve();
			// callback?.cancel({ upcomingOnly: true });
		};
	});

	return [setRef, rectStore] as const;
}

// offsetTop function returns the offsetTop value of a DOM element.
// The offsetTop value is the distance between the top of the element
// and the top of the viewport.
export function offsetTop(element: HTMLElement | null, accumulator = 0): number {
	if (!element) return 0;

	const top = accumulator + element.offsetTop;
	if (element.offsetParent) {
		return offsetTop(element.offsetParent as HTMLElement, top);
	}
	return top;
}

// offsetLeft function returns the offsetLeft value of a DOM element.
// The offsetLeft value is the distance between the left of the element
// and the left of the viewport.
export function offsetLeft(element: HTMLElement | null, accumulator = 0): number {
	if (!element) return 0;

	const left = accumulator + element.offsetLeft;
	if (element.offsetParent) {
		return offsetLeft(element.offsetParent as HTMLElement, left);
	}

	return left;
}
