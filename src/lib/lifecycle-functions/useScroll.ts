import { onMount } from 'svelte';
import { get } from 'svelte/store';

import { lenisStore } from '$lib/stores/lenis';

export function useScroll(callback: (...args: any[]) => void) {
	const lenisVal = get(lenisStore);

	const unsubscribe = lenisStore.subscribe((lenis) => {
		lenis?.on('scroll', callback);
		lenis?.emit();
	});

	onMount(() => {
		return () => {
			lenisVal?.off('scroll', callback);
			unsubscribe();
		};
	});
}
