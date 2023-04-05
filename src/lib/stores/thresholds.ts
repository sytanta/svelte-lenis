import { writable } from 'svelte/store';

export const thresholdsStore = writable<Record<string, number>>({});

export function addThreshold({ id, value }: { id: string; value: number }) {
	thresholdsStore.update((pre) => {
		return Object.assign({}, pre, { [id]: value });
	});
}
