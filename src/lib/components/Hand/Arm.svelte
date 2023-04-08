<script lang="ts" context="module">
	const material: {
		color: string | Color;
		roughness: { min: number; max: number; value: number };
		metalness: { min: number; max: number; value: number };
		wireframe: boolean;
	} = {
		color: '#b0b0b0',
		roughness: {
			min: 0,
			value: 0.4,
			max: 1
		},
		metalness: {
			min: 0,
			value: 1,
			max: 1
		},
		wireframe: false
	};

	const lights = {
		light1: {
			step: 1,
			value: [-200, 150, 50] as const
		},
		light2: {
			step: 1,
			value: [300, -100, 150] as const
		},
		light1Intensity: {
			min: 0,
			value: 1,
			max: 1
		},
		light2Intensity: {
			min: 0,
			value: 1,
			max: 1
		},
		lightsColor: '#ff98a2',
		ambientColor: '#0E0E0E'
	};

	// const model = {
	// 	custom: false,
	// 	scale: {
	// 		min: 0,
	// 		value: 0.05,
	// 		max: 0.06,
	// 		step: 0.001
	// 	},
	// 	position: [0, 0, 0],
	// 	rotation: { step: 1, min: -360, value: [0, 0, 0], max: 360 }
	// };

	type MaterialProps<T extends keyof typeof material> = [T, (typeof material)[T]];
	type LightsProps<T extends keyof typeof lights> = [T, (typeof lights)[T]];

	function updateMaterial(props: MaterialProps[]) {
		for (let [key, val] of props) {
			material[key] = val;
		}
	}

	function updateLights(props: LightsProps[]) {
		for (let [key, val] of props) {
			lights[key] = val;
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import {
		AmbientLight,
		Color,
		DirectionalLight,
		Euler,
		Group,
		MathUtils,
		Scene,
		Vector3
	} from 'three';

	import type Renderer from './renderer';

	import { useScroll } from '$lib/lifecycle-functions/useScroll';
	import { mapRange } from '$lib/utils/maths';
	import { thresholdsStore } from '$lib/stores/thresholds';
	import { steps } from './steps';
	import { loadGLB } from './loadGLB';

	export let renderer: Renderer;

	let type = 1;
	let updateML = false;
	const dummyArr = [0, 0, 0];
	const speed = 1;
	const rotationIntensity = 1;
	const floatIntensity = 1;
	const floatingRange = [-0.1, 0.1];

	let parentRef: Group;
	let groupRef: Group;
	let offset = Math.random() * 10000;
	let arm1: Scene, arm2: Scene;
	let currentArm: Scene | null = null;

	const updateArmMaterial = (arm: Scene | null, currentArm: Scene | null) => {
		if (arm && currentArm === arm) {
			const color = new Color(material.color);

			arm.traverse((node) => {
				if ('material' in node) {
					node.material.color = color;
					node.material.roughness = material.roughness.value;
					node.material.metalness = material.metalness.value;
					node.material.wireframe = material.wireframe;
					node.material.needsUpdate = true;
				}
			});
		}
	};

	$: if (updateML) {
		// updateMaterial(['color', color]);
		// material.color = new Color(material.color);

		if (arm1 && currentArm === arm1) {
			updateArmMaterial(arm1, currentArm);
		}

		if (arm2 && currentArm === arm2) {
			updateArmMaterial(arm2, currentArm);
		}

		updateML = false;
	}

	$: thresholds = Object.values($thresholdsStore).sort((a, b) => a - b);

	$: if (type === 1 && currentArm !== arm1) {
		currentArm = arm1;

		groupRef?.remove(arm2);
		groupRef?.add(arm1);
	} else if (type === 2 && currentArm !== arm2) {
		currentArm = arm2;

		groupRef?.remove(arm1);
		groupRef?.add(arm2);
	}

	$: if (thresholds?.length) {
		arm1?.scale?.set(1, 1, 1);
		onScroll(0);
	}

	onMount(async () => {
		const a1 = await loadGLB('/models/arm.glb');
		const a2 = await loadGLB('/models/arm2.glb');

		arm1 = a1.scene.children[0];
		arm2 = a2.scene.children[0];

		arm1.scale.set(0, 0, 0);
		arm2.scale.set(1, 1, 1);

		currentArm = arm1;
		updateArmMaterial(arm1, currentArm);

		const ambientLight1 = new AmbientLight(new Color(lights.ambientColor));

		const groupLight1 = new Group();
		groupLight1.position.set(...lights.light1.value);
		const directionalLight1 = new DirectionalLight(
			new Color(lights.lightsColor),
			lights.light1Intensity.value
		);

		const groupLight2 = new Group();
		groupLight2.position.set(...lights.light2.value);
		const directionalLight2 = new DirectionalLight(
			new Color(lights.lightsColor),
			lights.light2Intensity.value
		);

		groupLight1.add(directionalLight1);
		groupLight2.add(directionalLight2);

		parentRef = new Group();
		groupRef = new Group();

		groupRef.add(arm1);
		parentRef.add(groupRef);

		renderer?.scene?.add(ambientLight1);
		renderer?.scene?.add(groupLight1);
		renderer?.scene?.add(groupLight2);
		renderer?.scene?.add(parentRef);

		const unsubscribe = renderer.onFrame((state) => {
			if (!parentRef) return;

			const t = offset + state.clock.getElapsedTime();
			parentRef.rotation.x = (Math.cos((t / 4) * speed) / 8) * rotationIntensity;
			parentRef.rotation.y = (Math.sin((t / 4) * speed) / 8) * rotationIntensity;
			parentRef.rotation.z = (Math.sin((t / 4) * speed) / 20) * rotationIntensity;

			let yPosition = Math.sin((t / 4) * speed) / 10;
			yPosition = MathUtils.mapLinear(
				yPosition,
				-0.1,
				0.1,
				floatingRange?.[0] ?? -0.1,
				floatingRange?.[1] ?? 0.1
			);

			parentRef.position.y = yPosition * floatIntensity;
		});

		return () => {
			unsubscribe && unsubscribe();
		};
	});

	function onScroll(scroll: number) {
		if (!groupRef) return;

		// if (model.custom) {
		// 	groupRef.scale.setScalar(renderer.viewport.height * model.scale.value);
		// 	groupRef.position.set(
		// 		renderer.viewport.width * model.position[0],
		// 		renderer.viewport.height * model.position[1],
		// 		0
		// 	);
		// 	groupRef.rotation.fromArray(model.rotation.value.map((v) => MathUtils.degToRad(v)));
		// 	return;
		// }

		const current = thresholds.findIndex((v) => scroll < v) - 1;

		const start = thresholds[current];
		const end = thresholds[current + 1];
		const progress = mapRange(start, end, scroll, 0, 1);

		const from = steps[current];
		const to = steps[current + 1];

		groupRef.visible = from?.type === to?.type;

		if (!to) return;

		const _scale = mapRange(0, 1, progress, from.scale, to.scale);
		const _position = new Vector3(
			renderer.viewport.width * mapRange(0, 1, progress, from.position[0], to.position[0]),
			renderer.viewport.height * mapRange(0, 1, progress, from.position[1], to.position[1]),
			0
		);
		const _rotation = new Euler().fromArray(
			dummyArr.map((_, i) => mapRange(0, 1, progress, from.rotation[i], to.rotation[i])) as [
				number,
				number,
				number
			]
		);

		groupRef.scale.setScalar(renderer.viewport.height * _scale);
		groupRef.position.copy(_position);
		groupRef.rotation.copy(_rotation);

		type = to.type;
	}

	useScroll(({ scroll }) => {
		onScroll(scroll);

		if (scroll < $thresholdsStore['light-start']) {
			// lights = Object.assign({}, lights, {
			// 	light1Intensity: 0.35,
			// 	light2Intensity: 0.15,
			// 	lightsColor: '#ff98a2',
			// 	ambientColor: '#ff98a2'
			// });
			if (lights.lightsColor === '#ff98a2') return;

			// lights.light1Intensity.value = 0.35;
			// lights.light2Intensity.value = 0.15;
			// lights.lightsColor = '#ff98a2';
			// lights.ambientColor = '#ff98a2';
			// lights = lights;

			updateLights([
				['light1Intensity', { min: 0, value: 0.35, max: 1 }],
				['light2Intensity', { min: 0, value: 0.15, max: 1 }],
				['lightsColor', '#ff98a2'],
				['ambientColor', '#ff98a2']
			]);

			// material = Object.assign({}, material, {
			// 	color: '#b0b0b0',
			// 	roughness: 0.4,
			// 	metalness: 1
			// });
			// material.color = '#b0b0b0';
			// material.roughness.value = 0.4;
			// material.metalness.value = 1;
			// material = material;

			updateMaterial([
				['color', '#b0b0b0'],
				[
					'roughness',
					{
						min: 0,
						value: 0.4,
						max: 1
					}
				],
				[
					'metalness',
					{
						min: 0,
						value: 1,
						max: 1
					}
				]
			]);

			updateML = true;
		} else {
			// lights = Object.assign({}, lights, {
			// 	light1Intensity: 1,
			// 	light2Intensity: 1,
			// 	lightsColor: '#efefef',
			// 	ambientColor: '#b0b0b0'
			// });
			if (lights.lightsColor === '#efefef') return;

			// lights.light1Intensity.value = 1;
			// lights.light2Intensity.value = 1;
			// lights.lightsColor = '#efefef';
			// lights.ambientColor = '#b0b0b0';
			// lights = lights;

			updateLights([
				['light1Intensity', { min: 0, value: 1, max: 1 }],
				['light2Intensity', { min: 0, value: 1, max: 1 }],
				['lightsColor', '#efefef'],
				['ambientColor', '#b0b0b0']
			]);

			// material = Object.assign({}, material, {
			// 	color: '#efefef',
			// 	roughness: 0.4,
			// 	metalness: 0.6
			// });
			// material.color = '#efefef';
			// material.roughness.value = 0.4;
			// material.metalness.value = 0.6;
			// material = material;

			updateMaterial([
				['color', '#efefef'],
				[
					'roughness',
					{
						min: 0,
						value: 0.4,
						max: 1
					}
				],
				[
					'metalness',
					{
						min: 0,
						value: 0.6,
						max: 1
					}
				]
			]);

			updateML = true;
		}
	});
</script>
