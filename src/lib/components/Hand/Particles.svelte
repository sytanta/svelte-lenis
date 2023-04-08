<script lang="ts">
	import { onMount } from 'svelte';
	import {
		BufferAttribute,
		BufferGeometry,
		Color,
		MathUtils,
		Points,
		ShaderMaterial,
		Vector2
	} from 'three';

	import type Renderer from './renderer';

	// import { useScroll } from '$lib/lifecycle-functions/useScroll';

	import fragmentShader from './particles/fragment.glsl';
	import vertexShader from './particles/vertex.glsl';

	export let renderer: Renderer;
	export let width = 250;
	export let height = 250;
	export let depth = 250;
	export let count = 1000;
	// export let scale = 100;
	export let size = 100;

	const positions = () => {
		const array = new Array(count * 3);

		for (let i = 0; i < array.length; i += 3) {
			array[i] = MathUtils.randFloatSpread(width);
			array[i + 1] = MathUtils.randFloatSpread(height);
			array[i + 2] = MathUtils.randFloatSpread(depth);
		}

		return Float32Array.from(array);
	};

	const noise = Float32Array.from(Array.from({ length: count * 3 }, () => Math.random() * 100));
	const sizes = Float32Array.from(Array.from({ length: count }, () => Math.random() * size));
	const speeds = Float32Array.from(Array.from({ length: count }, () => Math.random() * 0.2));
	const scales = Float32Array.from(Array.from({ length: count }, () => Math.random() * 100));

	let uniforms = {
		uTime: { value: 0 },
		uColor: {
			value: new Color('rgb(255, 207, 206)')
		},
		uScroll: {
			value: 0
		},
		uResolution: {
			value: new Vector2(width, height)
		}
	};

	onMount(() => {
		const bufferGeometry = new BufferGeometry();
		bufferGeometry.setAttribute('position', new BufferAttribute(positions(), 3));
		bufferGeometry.setAttribute('noise', new BufferAttribute(noise, 3));
		bufferGeometry.setAttribute('size', new BufferAttribute(sizes, 1));
		bufferGeometry.setAttribute('speed', new BufferAttribute(speeds, 1));
		bufferGeometry.setAttribute('scale', new BufferAttribute(scales, 1));

		const material = new ShaderMaterial({
			uniforms,
			vertexShader,
			fragmentShader,
			transparent: true
		});

		const dots = new Points(bufferGeometry, material);

		// uniforms.uResolution.value.set(renderer.viewport.width, renderer.viewport.height);

		renderer?.scene?.add(dots);

		const unsubscribe = renderer?.onFrame(({ clock }) => {
			uniforms.uTime.value = clock.getElapsedTime();
		});

		return () => {
			unsubscribe && unsubscribe();
		};
	});

	// useScroll(({ scroll }) => {
	// 	uniforms.uScroll.value = scroll;
	// });
</script>
