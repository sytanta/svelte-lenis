<script lang="ts">
	import { onMount } from 'svelte';
	import cn from 'clsx';

	import { browser } from '$app/environment';
	import { lenisStore } from '$lib/stores/lenis';
	import { introOutStore, setIntroOutStore } from '$lib/stores/introOut';
	import { useMediaQuery } from '$lib/lifecycle-functions/useMediaQuery';

	import LNS from './LNS.svelte';
	import EI from './EI.svelte';

	const isMobile = useMediaQuery('(max-width: 800px)');

	let isLoaded = false;
	let scroll = false;

	$: if (browser && $isMobile) {
		document.documentElement.classList.toggle('intro', false);
	}

	$: if (browser && $lenisStore) {
		if (scroll) {
			$lenisStore.start();
			document.documentElement.classList.toggle('intro', false);
		} else {
			setTimeout(() => {
				$lenisStore?.stop();
			}, 0);

			document.documentElement.classList.toggle('intro', true);
		}
	}

	$: if (browser && !scroll) {
		document.documentElement.classList.toggle('intro', true);
	}

	$: EIClassName = cn($introOutStore && 'translate');

	onMount(() => {
		setTimeout(() => (isLoaded = true), 1000);

		if ($isMobile) {
			scroll = true;
			setIntroOutStore(true);
		}
	});

	function onTransitionEnd(e: TransitionEvent & { currentTarget: HTMLDivElement }) {
		e.currentTarget.classList.forEach((value) => {
			if (value.includes('out')) {
				scroll = true;
			}

			// if (value.includes('show')) {
			setIntroOutStore(true);
			// }
		});
	}
</script>

<div class={cn('wrapper', isLoaded && 'out')} on:transitionend={onTransitionEnd}>
	<div class={cn(isLoaded && 'relative')}>
		<LNS {isLoaded} isIntro={true} fill={'var(--black)'} />
		<EI {isLoaded} isIntro={true} fill={'var(--black)'} bind:class={EIClassName} />
	</div>
</div>

<style lang="scss">
	@import '../styles/_functions';

	$intro-in: 1500ms;
	$intro-out: 1500ms;

	.wrapper {
		height: 100vh;
		background-color: var(--pink);
		left: 0;
		overflow: hidden;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1000;

		@include mobile {
			display: none;
		}

		&.out {
			transform: translate3d(0, -100%, 0);
			transition: transform $intro-out var(--ease-out-expo);
			transition-delay: calc($intro-in + 0ms);
		}

		.relative {
			padding: desktop-vw(30px) desktop-vw(32.5px);

			transition: transform $intro-out var(--ease-out-expo);
			transform: translate3d(0, desktop-vh(850px), 0);
			transition-delay: calc($intro-in + 0ms);

			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.show {
			transition: transform $intro-in var(--ease-out-expo);
			transition-delay: calc(var(--index) * 75ms);
			transform: translate3d(0, 0, 0);
		}
	}

	.translate {
		@include desktop {
			transform: translate3d(0, -100%, 0);
			transition: transform $intro-out var(--ease-out-expo);
		}
	}
</style>
