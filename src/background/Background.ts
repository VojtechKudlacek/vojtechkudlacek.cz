import * as THREE from 'three';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import ShapeFactory from './ShapeFactory';

class Background {

	private wrap: HTMLDivElement;
	private stats!: Stats;

	private camera!: THREE.PerspectiveCamera;
	private scene!: THREE.Scene;
	private material!: THREE.MeshBasicMaterial;
	private renderer!: THREE.WebGLRenderer;
	private glitchPass!: GlitchPass;
	private composer!: EffectComposer;

	private shapeFactory: ShapeFactory;
	private shapes: Array<Shape>;

	constructor(wrap: HTMLDivElement) {
		this.wrap = wrap;
		this.shapeFactory = new ShapeFactory();
		this.shapes = [];
		this.animation = this.animation.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
	}

	private animation(): void {
		this.stats.begin();
		for (const shape of this.shapes) {
			shape.mesh.position.x += (shape.vx * 0.1);
			shape.mesh.position.y += (shape.vy * 0.1);
			shape.mesh.rotation.z += (shape.vr * 0.1);
		}
		this.composer.render();
		this.stats.end();
	}

	private onClick(): void {
		this.glitchPass.goWild = !this.glitchPass.goWild;
	}

	public init(): void {
		this.stats = Stats();
		this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 200);
		this.camera.lookAt(0, 0, 0);
		this.camera.position.z = 100;

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x000000);
		this.scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);

		this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });

		this.scene.add(new THREE.AmbientLight(0x222222));

		this.shapes.push(
			this.shapeFactory.createShape(3, 1, (window.innerWidth / 20), (window.innerHeight / 20)),
			this.shapeFactory.createShape(3, 1, (window.innerWidth / 20), (window.innerHeight / 20)),
			this.shapeFactory.createShape(3, 1, (window.innerWidth / 20), (window.innerHeight / 20)),
			this.shapeFactory.createShape(3, 1, (window.innerWidth / 20), (window.innerHeight / 20)),
			this.shapeFactory.createShape(3, 1, (window.innerWidth / 20), (window.innerHeight / 20)),
		);
		for (const shape of this.shapes) {
			this.scene.add(shape.mesh);
		}

		const cross = new THREE.BufferGeometry().setFromPoints([
			new THREE.Vector3(0, 0, 0),
			new THREE.Vector3(50, 50, 0),
			new THREE.Vector3(25, 25, 0),
			new THREE.Vector3(0, 50, 0),
			new THREE.Vector3(50, 0, 0),
		]);
		const crossMesh = new THREE.Line(cross, this.material);
		this.scene.add(crossMesh);

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.setAnimationLoop(this.animation);

		this.composer = new EffectComposer(this.renderer);
		this.composer.addPass(new RenderPass(this.scene, this.camera));
		this.composer.addPass(new FilmPass(0.35, 0.5, 2048, 1));
		this.glitchPass = new GlitchPass();
		// this.composer.addPass(this.glitchPass);

		this.wrap.appendChild(this.renderer.domElement);
		this.wrap.appendChild(this.stats.dom);

		window.addEventListener('resize', this.onWindowResize);
		window.addEventListener('click', this.onClick);
	}

	private onWindowResize(): void {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.composer.setSize(window.innerWidth, window.innerHeight);
	}

}

export default Background;
