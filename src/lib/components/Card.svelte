<script lang="ts">
	import type { ComponentType } from 'svelte';
	import cn from 'clsx';

	let className = '';

	export { className as class };
	export let number: number | undefined = undefined;
	export let text: string | ComponentType = '';
	export let inverted = false;
	export let background = 'rgba(14, 14, 14, 0.15)';
</script>

<div class={cn(className, 'wrapper', inverted && 'inverted')} style={`--background: ${background}`}>
	{#if number != undefined}
		<p class="number">{number.toString().padStart(2, '0')}</p>
	{/if}
	{#if text && typeof text === 'string'}
		<p class="text">{text}</p>
	{:else if text}
		<svelte:component this={text} />
	{/if}
</div>

<style lang="scss">
	@import '../styles/_functions';

	.wrapper {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		color: var(--theme-secondary);
		border: 1px solid;
		aspect-ratio: 1 / 1;
		padding: mobile-vw(24px);
		width: mobile-vw(343px);
		background-color: var(--background);
		backdrop-filter: blur(5px);

		&.inverted {
			color: var(--theme-primary);
			background-color: var(--theme-secondary);
		}

		@include desktop {
			width: columns(4);
			padding: desktop-vw(24px);
		}

		.number {
			color: var(--theme-contrast);
			font-stretch: condensed;
			font-weight: 900;
			line-height: 86%;
			letter-spacing: -0.02em;
			font-size: mobile-vw(56px);

			@include desktop {
				font-size: desktop-vw(96px);
			}
		}

		.text {
			text-transform: uppercase;
			font-stretch: expanded;
			line-height: 100%;
			letter-spacing: -0.01em;
			font-size: mobile-vw(20px);

			@include desktop {
				font-size: desktop-vw(28px);
			}

			span {
				font-stretch: normal;
				font-weight: 600;
			}
		}
	}
</style>
