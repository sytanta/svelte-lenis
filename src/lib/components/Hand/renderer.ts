import {
	AmbientLight,
	Clock,
	DirectionalLight,
	OrthographicCamera,
	PerspectiveCamera,
	Scene,
	WebGLRenderer
} from 'three';

export default class Renderer {
	scene: Scene | undefined;
	camera: OrthographicCamera | PerspectiveCamera | undefined;
	renderer: WebGLRenderer | undefined;

	fov: number;
	nearPlane: number;
	farPlane: number;
	canvas: HTMLCanvasElement | undefined;

	viewport: {
		width: number;
		height: number;
	} = { width: 0, height: 0 };

	clock: Clock | undefined;

	ambientLight: AmbientLight | undefined;
	directionalLight: DirectionalLight | undefined;

	subscribers: ((args: { clock: Clock }) => void)[] = [];

	constructor() {
		this.scene = undefined;
		this.camera = undefined;
		this.renderer = undefined;

		// Camera params
		this.fov = 75;
		this.nearPlane = 1;
		this.farPlane = 1000;

		// Additional components
		this.clock = undefined;

		// Lighting is basically required
		this.ambientLight = undefined;
		this.directionalLight = undefined;

		this.animate = this.animate.bind(this);
	}

	initialize(canvas: HTMLCanvasElement) {
		if (!this.canvas) this.canvas = canvas;

		this.scene = new Scene();
		// this.camera = new PerspectiveCamera(
		// 	this.fov,
		// 	this.viewport.width / this.viewport.height,
		// 	1,
		// 	1000
		// );

		const width = window.innerWidth;
		const height = window.innerHeight;
		const aspect = width > height ? width / height : height / width; // (window.devicePixelRatio * width) / height;
		// const pixelRatio = Math.min(window.devicePixelRatio, 2);
		// const frustrum = 5;

		this.camera = new OrthographicCamera(
			-window.innerWidth / aspect,
			window.innerWidth / aspect,
			window.innerHeight / aspect,
			-window.innerHeight / aspect,
			// (-aspect * frustrum) / 2,
			// (aspect * frustrum) / 2,
			// frustrum / 2,
			// -frustrum / 2,
			// 0,
			// 0,
			// 0,
			// 0,
			0.01,
			10000
		);
		this.camera.position.set(0, 0, 1000);

		this.viewport.width = window.innerWidth / this.camera.zoom;
		this.viewport.height = window.innerHeight / this.camera.zoom;

		this.renderer = new WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true,
			powerPreference: 'high-performance'
		});
		this.renderer.setSize(this.viewport.width, this.viewport.height);

		const target = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
		this.renderer.setPixelRatio(Math.min(Math.max(0, target), 1));

		this.clock = new Clock();

		// If window resizes
		window.addEventListener('resize', () => this.onWindowResize(), false);
	}

	animate() {
		window.requestAnimationFrame(this.animate);
		this.render();
	}

	render() {
		for (const subscriber of this.subscribers) {
			subscriber({ clock: this.clock! });
		}

		this.renderer!.render(this.scene!, this.camera!);
	}

	onWindowResize() {
		this.viewport.width = window.innerWidth;
		this.viewport.height = window.innerHeight;

		// if (this.camera) this.camera.aspect = window.innerWidth / window.innerHeight;

		this.camera?.updateProjectionMatrix();
		this.renderer?.setSize(window.innerWidth, window.innerHeight);
	}

	onFrame(subscriber: (arg: { clock: Clock }) => void) {
		this.subscribers.push(subscriber);

		return () => {
			this.subscribers = this.subscribers.filter((s) => s !== subscriber);
		};
	}
}
