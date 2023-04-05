<script lang="ts">
	import { onMount, type ComponentType } from 'svelte';

	import cn from 'clsx';

	let className = '';

	export { className as class };
	export let icon: ComponentType;
	export let arrow = false;
	export let href = '';

	let Arrow: ComponentType;

	onMount(async () => {
		Arrow = (await import('./Icons/ArrowButtons.svelte')).default;
	});
</script>

{#if href}
	<a {href} class={cn('button', className, icon && 'has-icon')}>
		{#if icon}<span class="icon"><svelte:component this={icon} class="arrow" /></span>{/if}
		<span class="text">
			<span class="visible">
				<slot />
				{#if arrow}<svelte:component this={Arrow} class="arrow" />{/if}
			</span>
			<span aria-hidden="true" class="hidden">
				<slot />
				{#if arrow}<svelte:component this={Arrow} class="arrow" />{/if}
			</span>
		</span>
	</a>
{:else}
	<button class={cn('button', className, icon && 'has-icon')} on:click>
		{#if icon}<span class="icon"><svelte:component this={icon} class="arrow" /></span>{/if}
		<span class="text">
			<span class="visible">
				<slot />
				{#if arrow}<svelte:component this={Arrow} class="arrow" />{/if}
			</span>
			<span aria-hidden="true" class="hidden">
				<slot />
				{#if arrow}<svelte:component this={Arrow} class="arrow" />{/if}
			</span>
		</span>
	</button>
{/if}

<style lang="scss">
	@import '$lib/styles/_functions';

	.button {
		display: flex;
		grid-template-columns: desktop-vw(48px) 1fr;
		align-items: center;
		justify-content: space-between;
		user-select: none;
		text-transform: uppercase;
		position: relative;
		line-height: 200%;
		font-size: mobile-vw(14px);
		color: var(--black);
		overflow: hidden;
		text-align: center;

		@include desktop {
			font-size: desktop-vw(14px);
			letter-spacing: -0.01em;
		}

		.text {
			position: relative;
			z-index: 10;
			flex-grow: 1;

			.visible,
			.hidden {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;

				@include desktop {
					padding: 0 desktop-vw(24px);
				}
			}

			.visible {
				position: relative;
				transition: transform 600ms var(--ease-out-expo), opacity 600ms var(--ease-out-expo);
				transform: scaleY(1);
				transform-origin: bottom;
			}

			.hidden {
				transform-origin: top;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				transform: scaleY(0);
				opacity: 0;
				transition: transform 600ms var(--ease-out-expo), opacity 400ms var(--ease-out-expo);

				:global(.arrow) {
					transform: translate(-50%, 50%);
				}
			}
		}

		&::after,
		&::before {
			position: absolute;
			left: 0;
			top: 0;
			content: '';
			width: 100%;
			height: 100%;
		}

		&:before {
			background-color: var(--theme-contrast);
		}

		&:after {
			transform: scaleY(0);
			background-color: var(--theme-secondary);
			z-index: 0;
			transition: transform 600ms var(--ease-out-expo);
			transform-origin: top;
		}

		.icon {
			display: flex;
			aspect-ratio: 1 / 1;
			transition: border-color 600ms var(--ease-out-expo);
			width: mobile-vw(48px);
			z-index: 10;
			padding: mobile-vw(12px);
			background-color: var(--theme-primary);
			border: 1px solid var(--pink);

			@include desktop {
				width: desktop-vw(48px);
				padding: desktop-vw(12px);
			}

			:global(svg) {
				color: var(--theme-secondary);
				margin: auto;
				position: relative;
				transition: color 600ms var(--ease-out-expo);
				background-color: var(--theme-primary);
				width: mobile-vw(24px);
				height: mobile-vw(24px);

				@include desktop {
					width: desktop-vw(24px);
					height: desktop-vw(24px);
				}
			}
		}

		:global(.arrow) {
			position: relative;
			z-index: 10;
			aspect-ratio: 1 / 1;
			width: mobile-vw(10px);
			margin-left: mobile-vw(16px);
			transition: transform 600ms var(--ease-out-expo);

			@include desktop {
				width: desktop-vw(10px);
				margin-left: desktop-vw(16px);
			}
		}

		@include hover {
			&:hover {
				color: var(--theme-primary);

				&::after {
					transform: scaleY(1);
					transform-origin: bottom;
				}

				.text {
					.visible {
						transform: scaleY(0);
						opacity: 0;
						transform-origin: top;

						:global(.arrow) {
							transform: translate(50%, -50%);
						}
					}

					.hidden {
						transform: scaleY(1);
						transform-origin: bottom;
						opacity: 1;

						:global(.arrow) {
							transform: translate(0, 0);
						}
					}
				}

				.icon {
					border: 1px solid var(--theme-secondary);
				}
			}
		}
	}
</style>
