<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import cn from 'clsx';

	let cursor: HTMLDivElement;
	let isGrab = false;
	let isPointer = false;
	let hasMoved = false;

	const onMouseMove = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
		gsap.to(cursor, {
			x: clientX,
			y: clientY,
			duration: hasMoved ? 0.6 : 0,
			ease: 'expo.out'
		});

		hasMoved = true;
	};

	const onMouseEnterPointer = () => {
		isPointer = true;
	};
	const onMouseLeavePointer = () => {
		isPointer = false;
	};

	const onMouseEnterGrab = () => {
		isGrab = true;
	};
	const onMouseLeaveGrab = () => {
		isGrab = false;
	};

	onMount(() => {
		document.documentElement.classList.add('has-custom-cursor');

		let pointerElements: Element[] = [
			...document.querySelectorAll("button,a,input,label,[data-cursor='pointer']")
		];

		pointerElements.forEach((element) => {
			element.addEventListener('mouseenter', onMouseEnterPointer, false);
			element.addEventListener('mouseleave', onMouseLeavePointer, false);
		});

		let grabElements: Element[] = [
			...document.querySelectorAll("button,a,input,label,[data-cursor='pointer']")
		];

		grabElements.forEach((element) => {
			element.addEventListener('mouseenter', onMouseEnterGrab, false);
			element.addEventListener('mouseleave', onMouseLeaveGrab, false);
		});

		return () => {
			document.documentElement.classList.remove('has-custom-cursor');

			pointerElements.forEach((element) => {
				element.removeEventListener('mouseenter', onMouseEnterPointer, false);
				element.removeEventListener('mouseleave', onMouseLeavePointer, false);
			});

			grabElements.forEach((element) => {
				element.removeEventListener('mouseenter', onMouseEnterGrab, false);
				element.removeEventListener('mouseleave', onMouseLeaveGrab, false);
			});
		};
	});
</script>

<svelte:window on:mousemove={onMouseMove} />

<div style:opacity={hasMoved ? 1 : 0} class="container">
	<div bind:this={cursor}>
		<div class={cn('cursor', isGrab && 'grab', isPointer && 'pointer')} />
	</div>
</div>

<style lang="scss">
	@import '../styles/_functions';

	.container {
		left: 0;
		height: 100vh;
		overflow: hidden;
		pointer-events: none;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10000;

		@media (hover: none) {
			display: none;
		}

		.cursor {
			border: mobile-vw(2px) solid var(--pink);
			border-radius: 100%;
			height: 40px;
			opacity: 0.4;
			position: absolute;
			transform: translate(-50%, -50%);
			transition: transform 600ms var(--ease-out-expo);
			width: 40px;

			@include desktop {
				border: desktop-vw(2px) solid var(--pink);
			}

			&.pointer {
				transform: translate(-50%, -50%) scale(0.5);
			}
		}
	}
</style>
