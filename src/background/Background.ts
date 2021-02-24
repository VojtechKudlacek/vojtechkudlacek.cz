import * as PIXI from 'pixi.js';
import ShapeManager from './ShapeManager';
import Projection from './Projection';
import MouseLight from './MouseLight';
import Stats from './Stats';

class Background {

	private wrap: HTMLDivElement;
	private app: PIXI.Application;

	private mouseLight: MouseLight;
	private mouseContainer: PIXI.Container;

	private shapeManager: ShapeManager;
	private shapeContainer: PIXI.Container;

	private projection: Projection;
	private projectionContainer: PIXI.Container;

	private stats: Stats;

	constructor(wrap: HTMLDivElement) {
		this.stats = new Stats();
		this.wrap = wrap;
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x000000,
			resolution: 1, // window.devicePixelRatio || 1
		});
		this.mouseContainer = new PIXI.Container();
		this.shapeContainer = new PIXI.Container();
		this.projectionContainer = new PIXI.Container();
		this.mouseLight = new MouseLight({ container: this.mouseContainer });
		this.shapeManager = new ShapeManager({
			container: this.shapeContainer,
			size: 12,
			thickness: 1,
			alpha: 0.2,
			maxCount: 25,
			perExplosion: 4,
			perExplosionRange: 1,
			minSpeed: 3,
			maxSpeed: 6,
		});
		this.projection = new Projection({
			container: this.projectionContainer,
			alpha: 0.1,
			thickness: 1,
			ratio: 15,
		});
		this.animation = this.animation.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.mouseClick = this.mouseClick.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
	}

	private animation(): void {
		this.stats.tick();
		this.mouseLight.noiseTick();
		this.shapeManager.process();
	}

	public init(): void {
		this.wrap.appendChild(this.app.view);
		this.wrap.appendChild(this.stats.dom);
		this.app.stage.addChild(this.shapeContainer);
		this.app.stage.addChild(this.projectionContainer);
		this.app.stage.addChild(this.mouseContainer);
		this.app.ticker.add(this.animation);
		this.projection.init();
		this.mouseLight.init();
		window.addEventListener('resize', this.onWindowResize);
		window.addEventListener('mousemove', this.mouseMove);
		window.addEventListener('click', this.mouseClick);
	}

	private mouseMove({ x, y }: MouseEvent): void {
		this.mouseLight.updatePosition(x, y);
		this.projection.updatePosition(x, y);
	}

	private mouseClick({ x, y }: MouseEvent): void {
		this.shapeManager.explosion(x, y);
	}

	private onWindowResize(): void {
		this.app.resizeTo = window;
		this.app.resize();
	}

}

export default Background;
