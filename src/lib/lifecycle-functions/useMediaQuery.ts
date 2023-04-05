import { onMount } from 'svelte';

import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export function useMediaQuery(queryString: string) {
	const mediaQuery = (() => {
		if (browser) {
			try {
				return window.matchMedia(queryString);
			} catch (error) {
				if (process.env.NODE_ENV !== 'production') {
					console.error(error);
				}
			}
		}

		return null;
	})();

	const isMatch = writable<boolean>(false);

	const onChange = ({ matches }: { matches: boolean }) => {
		isMatch.set(!!matches);
	};

	const opts = Object.defineProperty({}, 'passive', {
		get: function () {
			return true;
		}
	});

	if (mediaQuery) {
		onChange(mediaQuery);
		mediaQuery.addEventListener('change', onChange, opts);
	}

	onMount(() => {
		return () => {
			mediaQuery?.removeEventListener('change', onChange, opts);
		};
	});

	return isMatch;
}
