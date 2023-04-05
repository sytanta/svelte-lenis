import { writable } from 'svelte/store';

export const themeStore = writable<string>('dark');

export function setThemeStore(themeType: string) {
	const theme = ['dark', 'light'].indexOf(themeType) > -1 ? themeType : 'dark';
	themeStore.set(theme);
}
