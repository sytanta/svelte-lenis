import { MathUtils } from 'three';

export const steps = [
	{
		position: [-0.1, -1.75, 0],
		scale: 0.045,
		rotation: [0, Math.PI * 0.5, 0] as const,
		type: 1
	},
	{
		position: [0.15, -0.4, 0],
		scale: 0.02,
		rotation: [MathUtils.degToRad(-45), MathUtils.degToRad(-135), MathUtils.degToRad(-45)] as const,
		type: 1
	},
	{
		position: [0.15, -0.4, 0],
		scale: 0.02,
		rotation: [MathUtils.degToRad(45), MathUtils.degToRad(-315), MathUtils.degToRad(-45)] as const,
		type: 1
	},
	{
		position: [-0.2, -0.35, 0],
		scale: 0.02,
		rotation: [MathUtils.degToRad(-90), MathUtils.degToRad(-405), MathUtils.degToRad(-45)] as const,
		type: 1
	},
	{
		position: [-1.2, -0.6, 0],
		scale: 0.05,
		rotation: [MathUtils.degToRad(-90), MathUtils.degToRad(-405), MathUtils.degToRad(-45)] as const,
		type: 1
	},
	{
		position: [-1.6, -0.6, 0],
		scale: 0.05,
		rotation: [MathUtils.degToRad(-90), MathUtils.degToRad(-405), MathUtils.degToRad(-45)] as const,
		type: 1
	},
	{
		position: [0.16, -1.38, 0],
		scale: 0.05,
		rotation: [MathUtils.degToRad(0), MathUtils.degToRad(200), MathUtils.degToRad(-16)] as const,
		type: 2
	},
	{
		position: [0, -0.68, 0],
		scale: 0.04,
		rotation: [MathUtils.degToRad(0), MathUtils.degToRad(-14), MathUtils.degToRad(-16)] as const,
		type: 2
	},
	{
		position: [-0.22, -0.61, 0],
		scale: 0.03,
		rotation: [
			MathUtils.degToRad(0),
			MathUtils.degToRad(-(157 + 360)),
			MathUtils.degToRad(-16)
		] as const,
		type: 2
	},
	{
		position: [0.2, -0.46, 0],
		scale: 0.03,
		rotation: [
			MathUtils.degToRad(0),
			MathUtils.degToRad(-(340 + 360)),
			MathUtils.degToRad(-16)
		] as const,
		type: 2
	}
];
