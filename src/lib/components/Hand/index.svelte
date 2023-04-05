<script lang="ts">
	import { onMount } from 'svelte';

	import Renderer from './renderer';

	import Particles from './Particles.svelte';
	import Arm from './Arm.svelte';

	let renderer: Renderer;
	let canvasRef: HTMLCanvasElement;
	let height: number, width: number;

	onMount(() => {
		height = window.innerHeight;
		width = window.innerWidth;

		renderer = new Renderer();
		renderer.initialize(canvasRef);
		renderer.animate();
	});
</script>

<div class="canvas-container">
	<div class="container">
		<canvas bind:this={canvasRef}>
			{#if renderer != undefined}
				<Particles {renderer} {width} {height} depth={500} count={100} size={150} />
				<Arm {renderer} />
			{/if}
		</canvas>
	</div>
</div>

<style lang="scss">
	.canvas-container {
		height: 100%;
		overflow: hidden;
		position: relative;
		width: 100%;

		.container {
			height: 100%;
			width: 100%;
		}

		canvas {
			display: block;
		}
	}
</style>
