import { get, writable } from 'svelte/store';

export const homePageLoadedComponentsStore = writable<Record<string, boolean>>({});

export function setHomePageLoadedComponentsStore(componentName: string) {
	if (get(homePageLoadedComponentsStore)[componentName]) return;

	homePageLoadedComponentsStore.update((pre) => Object.assign({}, pre, { [componentName]: true }));
}
