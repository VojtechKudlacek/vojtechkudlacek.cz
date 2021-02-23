import * as PIXI from 'pixi.js';
// import 'pixi-projection';
import ShapeManager from './ShapeManager';
import Stats from './Stats';

class Background {

	private wrap: HTMLDivElement;
	private app: PIXI.Application;

	private noise: PIXI.filters.NoiseFilter;

	private mouse: PIXI.Graphics;
	private mouseContainer: PIXI.Container;

	private shapeManager: ShapeManager;
	private shapeContainer: PIXI.Container;

	private stats: Stats;

	private testContainer: PIXI.Container;
	private test: {
		a: PIXI.Graphics;
		b: PIXI.Graphics;
		c: PIXI.Graphics;
	};

	constructor(wrap: HTMLDivElement) {
		this.stats = new Stats();
		this.wrap = wrap;
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x000000,
			resolution: 1, // window.devicePixelRatio || 1
		});
		this.test = {
			a: new PIXI.Graphics(),
			b: new PIXI.Graphics(),
			c: new PIXI.Graphics(),
		};
		this.mouse = new PIXI.Graphics();
		this.noise = new PIXI.filters.NoiseFilter(1, 0.01);
		this.mouseContainer = new PIXI.Container();
		this.shapeContainer = new PIXI.Container();
		this.shapeManager = new ShapeManager(this.shapeContainer, 20);
		this.animation = this.animation.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.testContainer = new PIXI.Container();
		this.onWindowResize = this.onWindowResize.bind(this);
	}

	private animation(): void {
		this.stats.tick();
		this.noise.seed += 0.01;
		if (this.noise.seed >= 0.99) {
			this.noise.seed = 0.01;
		}
		this.shapeManager.process();
		if (this.mouseInCenter) {
			if (this.test.a.rotation < 0) {
				this.test.a.rotation += 0.05;
				if (this.test.a.rotation > 0) {
					this.test.a.rotation = 0;
				}
			}
			if (this.test.c.rotation > 0) {
				this.test.c.rotation -= 0.05;
				if (this.test.c.rotation < 0) {
					this.test.c.rotation = 0;
				}
			}
		} else {
			if (this.test.a.rotation > -(Math.PI / 6)) {
				this.test.a.rotation -= 0.05;
				if (this.test.a.rotation < -(Math.PI / 6)) {
					this.test.a.rotation = -(Math.PI / 6);
				}
			}
			if (this.test.c.rotation < (Math.PI / 6)) {
				this.test.c.rotation += 0.05;
				if (this.test.c.rotation > (Math.PI / 6)) {
					this.test.c.rotation = (Math.PI / 6);
				}
			}
		}
	}

	public init(): void {
		this.wrap.appendChild(this.app.view);
		this.wrap.appendChild(this.stats.dom);
		this.app.ticker.add(this.animation);
		this.app.stage.addChild(this.mouseContainer);
		this.app.stage.addChild(this.shapeContainer);
		this.mouse.drawRect(-window.innerWidth, -window.innerHeight, window.innerWidth * 2, window.innerHeight * 2);
		this.mouse.beginFill(0xFFFFFF, 0.1);
		this.mouse.drawCircle(0, 0, Math.floor(window.innerHeight / 3));
		this.mouse.position.set(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2));
		this.mouse.filters = [new PIXI.filters.BlurFilter(300, 5)];
		this.mouseContainer.filters = [this.noise];
		this.mouseContainer.addChild(this.mouse);
		this.drawTest();
		window.addEventListener('resize', this.onWindowResize);
		window.addEventListener('mousemove', this.mouseMove);
	}

	private drawTest(): void {
		this.test.a.lineStyle(1, 0xFFFFFF, 0.3);
		this.test.a.position.set(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2));
		this.test.a.drawRect(-100, -100, 200, 200);
		this.test.a.rotation = -(Math.PI / 6);
		this.test.b.lineStyle(1, 0xFFFFFF, 0.3);
		this.test.b.position.set(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2));
		this.test.b.drawRect(-100, -100, 200, 200);
		this.test.c.lineStyle(1, 0xFFFFFF, 0.3);
		this.test.c.position.set(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2));
		this.test.c.drawRect(-100, -100, 200, 200);
		this.test.c.rotation = Math.PI / 6;
		this.testContainer.addChild(this.test.a, this.test.b, this.test.c);
		this.app.stage.addChild(this.testContainer);
	}

	private mouseInCenter: boolean = false;
	private mouseMove(e: MouseEvent): void {
		const xCenter = window.innerWidth / 2;
		const yCenter = window.innerHeight / 2;
		const padding = 100;
		if (e.x > (xCenter - padding) && e.x < (xCenter + padding) && e.y > (yCenter - padding) && e.y < (yCenter + padding)) {
			this.mouseInCenter = true;
		} else {
			this.mouseInCenter = false;
		}
		this.mouse.position.set(e.x, e.y);
	}

	private onWindowResize(): void {
		this.app.resizeTo = window;
		this.app.resize();
	}

}

export default Background;
