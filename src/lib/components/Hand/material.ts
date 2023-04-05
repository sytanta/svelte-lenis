import { Color, DoubleSide, MeshPhysicalMaterial } from 'three';

export const material = new MeshPhysicalMaterial({
	color: new Color('#FF98A2'),
	metalness: 1,
	roughness: 0.4,
	wireframe: true,
	side: DoubleSide
});
