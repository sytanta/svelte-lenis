import { writable } from 'svelte/store';

export const introOutStore = writable<boolean>(false);

export function setIntroOutStore(val: boolean) {
	introOutStore.set(val);
}
