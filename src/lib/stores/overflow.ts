import { writable } from 'svelte/store';

export const overflowStore = writable<boolean>(true);

export function setOverflowStore(val: boolean) {
	overflowStore.set(val);
}
