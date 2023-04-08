<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import cn from 'clsx';

	import { intersection } from '$lib/actions/intersection';
	import { useMediaQuery } from '$lib/lifecycle-functions/useMediaQuery';
	import { useRect } from '$lib/lifecycle-functions/useRect';
	import { useWindowSize } from '$lib/lifecycle-functions/useWindowSize';

	export let visible = true;

	let titleRef: HTMLSpanElement | null = null;
	let intersected = false;

	const emit = createEventDispatcher();

	const [rectRef] = useRect();
	const [size] = useWindowSize();
	const isMobile = useMediaQuery('(max-width: 800px)');

	$: if (!$isMobile) {
	}

	onMount(() => emit('mounted'));

	function rectAction(node: HTMLSpanElement) {
		rectRef(node);
	}
</script>

<span
	bind:this={titleRef}
	use:intersection={{
		threshold: 1
	}}
	on:intersecting={() => {
		intersected = true;
	}}
	use:rectAction
	class={cn('title', intersected && visible && 'visible')}
>
	<slot />
</span>

<style lang="scss">
	.title {
		.line {
			display: inline-block;
			overflow: hidden;

			> * {
				display: inline-block;
			}
		}

		&.visible {
			.line > * {
				transition: 1.2s var(--ease-out-expo) transform;
				transition-delay: calc(200ms * var(--i));
			}
		}

		&:not(.visible) {
			.line > * {
				transform: translateY(100%);
			}
		}
	}
</style>
