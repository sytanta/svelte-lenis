<script lang="ts">
	import { onMount } from 'svelte';

	import { lenisStore as lenis } from '$lib/stores/lenis';

	import { clamp, mapRange } from '$lib/utils/maths';
	import { useWindowSize } from '$lib/lifecycle-functions/useWindowSize';
	import { useScroll } from '$lib/lifecycle-functions/useScroll';

	let progressBar: HTMLDivElement;
	let clicked = false;

	const [size] = useWindowSize();

	$: windowHeight = $size.height;

	function onPointerUp() {
		clicked = false;
	}

	function onPointerMove(e: MouseEvent) {
		e.preventDefault();

		const offset = (windowHeight - innerHeight) / 2;
		const y = mapRange(0, windowHeight, e.clientY, -offset, innerHeight + offset);

		const progress = clamp(0, y / innerHeight, 1);
		const newPos = ($lenis?.limit || 0) * progress;

		if ($lenis)
			$lenis.direction === 'vertical' ? window.scrollTo(0, newPos) : window.scrollTo(newPos, 0);
	}

	useScroll(({ scroll, limit }: { scroll: number; limit: number }) => {
		const progress = scroll / limit;
		progressBar.style.transform = `scaleX(${progress})`;
	});

	onMount(() => {
		if (!clicked) return;

		window.addEventListener('pointermove', onPointerMove, false);
		window.addEventListener('pointerup', onPointerUp, false);

		return () => {
			window.removeEventListener('pointermove', onPointerMove, false);
			window.removeEventListener('pointerup', onPointerUp, false);
		};
	});
</script>

<div class="scrollbar">
	<div bind:this={progressBar} class="inner" />
</div>

<style lang="scss">
	@import '../styles/_functions';

	// hide native scrollbar

	.scrollbar {
		left: 0;
		padding: 0;
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100%;

		@media (hover: none) {
			display: none;
		}

		.inner {
			background-color: var(--pink);
			height: desktop-vw(4px);
			position: relative;
			transform: scaleX(0);
			transform-origin: 0 50%;
			width: 100%;
		}
	}
</style>
