<script lang="ts">
	import { onMount, type ComponentType, createEventDispatcher } from 'svelte';
	import cn from 'clsx';

	import { useRect } from '$lib/lifecycle-functions/useRect';
	import { useWindowSize } from '$lib/lifecycle-functions/useWindowSize';
	import { useScroll } from '$lib/lifecycle-functions/useScroll';
	import { clamp, mapRange } from '$lib/utils/maths';

	import Card from '../Card.svelte';
	import Card2 from './Card2.svelte';

	const cards = [
		{ text: 'Run scroll in the main thread' },
		{
			text: Card2
		},
		{ text: 'Made for 2022+' },
		{ text: 'Bring your own animation library' },
		{
			text: 'CONTROL THE SCROLL EASING DURATION'
		},
		{ text: 'Use any element as scroller' },
		{ text: 'Enjoy horizontal + vertical support' },
		{ text: 'Feel free to use “position: sticky” again' },
		{
			text: 'touch support'
		}
	];

	let AppearTitle: ComponentType;
	let containerRef: HTMLDivElement;
	let elementRef: HTMLDivElement;
	let current: number = -1;

	const emit = createEventDispatcher();

	const [windowSize] = useWindowSize();
	const [setRef, rect] = useRect();

	onMount(async () => {
		AppearTitle = (await import('../AppearTitle.svelte')).default;

		setRef(containerRef);

		emit('mounted');
	});

	useScroll(({ scroll }) => {
		if (!elementRef) return;

		const start = $rect.top - $windowSize.height * 2;
		const end = $rect.top + $rect.height - $windowSize.height;

		const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1);

		elementRef.style.setProperty(
			'--progress',
			String(clamp(0, mapRange($rect.top, end, scroll, 0, 1), 1))
		);

		current = Math.floor(progress * 10);
	});
</script>

<div bind:this={containerRef} class="features">
	<div class="layout-block-inner sticky">
		<aside class="title">
			<p class="h3">
				<svelte:component this={AppearTitle}
					>Lenis brings
					<br />
					<span class="grey">the heat</span></svelte:component
				>
			</p>
		</aside>
		<div bind:this={elementRef}>
			{#each cards as card, index (index)}
				<div class={cn('card', index <= current - 1 && 'current')} style={`--i: ${index}`}>
					<Card background="rgba(239, 239, 239, 0.8)" number={index + 1} text={card.text} />
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../styles/_functions';

	.features {
		height: 1600vh;

		@include desktop {
			min-height: desktop-vw(1310px);
		}

		.card {
			--d: 100vh;

			position: absolute;
			will-change: transform;
			transition-duration: 1.2s;
			transition-property: opacity, transform;
			transition-timing-function: var(--ease-out-expo);

			@include mobile {
				@for $i from 0 through 8 {
					&:nth-child(#{$i + 1}) {
						top: calc(
							(((100 * var(--vh, 1vh)) - #{mobile-vw(440px)} - (var(--layout-margin))) / 8) * $i
						);
					}
				}
			}

			@include desktop {
				@for $i from 0 through 8 {
					&:nth-child(#{$i + 1}) {
						top: calc(((var(--d) - #{desktop-vw(440px)} - (2 * var(--layout-margin))) / 8) * $i);
						left: calc(((100vw - #{desktop-vw(440px)} - (2 * var(--layout-margin))) / 8) * $i);
					}
				}
			}

			&:not(.current) {
				transform: translate3d(100%, 100%, 0);
				opacity: 0;
			}
		}

		.title {
			text-align: end;
			padding-bottom: var(--layout-margin);

			@include desktop {
				padding: 0;
				position: absolute;
				right: var(--layout-margin);
			}
		}
	}

	.sticky {
		overflow: hidden;
		position: sticky;
		top: 0;
		height: 100vh;
		padding: var(--layout-margin);

		@include desktop {
		}

		> * {
			position: relative;
		}
	}
</style>
