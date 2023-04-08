<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { gsap } from 'gsap';

	import { useWindowSize } from '$lib/lifecycle-functions/useWindowSize';
	import { mapRange } from '$lib/utils/maths';

	let className = '';

	export { className as class };
	export let id = 'parallax';
	export let speed = 1;
	export let position: string = '';

	const emit = createEventDispatcher();

	const [size] = useWindowSize();

	let triggerRef: HTMLDivElement;
	let targetRef: HTMLDivElement;

	onMount(async () => {
		const y = $size.width * speed * 0.1;

		const setY = gsap.quickSetter(targetRef, 'y', 'px');
		const set3D = gsap.quickSetter(targetRef, 'force3D');

		const timeline = gsap.timeline({
			scrollTrigger: {
				id: id,
				trigger: targetRef,
				scrub: true,
				start: 'top bottom',
				end: 'bottom top',
				onUpdate: (e) => {
					if (position === 'top') {
						setY(e.progress * y);
					} else {
						setY(-mapRange(0, 1, e.progress, -y, y));
					}

					set3D(e.progress > 0 && e.progress < 1);
				}
			}
		});

		emit('mounted');

		return () => {
			timeline.kill();
		};
	});
</script>

<div bind:this={triggerRef}>
	<div bind:this={targetRef} class={className}>
		<slot />
	</div>
</div>
