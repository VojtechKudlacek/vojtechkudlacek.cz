import * as PIXI from 'pixi.js';
import ShapeFactory from './ShapeFactory';
import Stats from './Stats';

class Background {

	private wrap: HTMLDivElement;
	private app: PIXI.Application;

	private noise: PIXI.filters.NoiseFilter;

	private mouse: PIXI.Graphics;
	private mouseContainer: PIXI.Container;

	private shapeFactory: ShapeFactory;
	private shapes: Array<Shape>;
	private shapeContainer: PIXI.Container;

	private stats: Stats;

	constructor(wrap: HTMLDivElement) {
		this.stats = new Stats();
		this.wrap = wrap;
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x000000,
			resolution: window.devicePixelRatio || 1,
		});
		this.mouse = new PIXI.Graphics();
		this.noise = new PIXI.filters.NoiseFilter(1, 0.01);
		this.mouseContainer = new PIXI.Container();
		this.shapeContainer = new PIXI.Container();
		this.shapeFactory = new ShapeFactory();
		this.shapes = [];
		this.animation = this.animation.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
	}

	private refill(): void {
		setInterval(() => {
			if (this.shapes.length < 10) {
				const shape = this.shapeFactory.createShape(12, 1);
				this.shapes.push(shape);
				this.shapeContainer.addChild(shape.content);
			}
		}, 1000);
	}

	private animation(): void {
		this.stats.tick();
		this.noise.seed += 0.01;
		if (this.noise.seed >= 0.99) {
			this.noise.seed = 0.01;
		}
		for (let i = 0; i < this.shapes.length; i++) {
			if (this.shapeFactory.isOutOfscreen(this.shapes[i], window.innerWidth, window.innerHeight)) {
				this.shapeContainer.removeChild(this.shapes[i].content);
				this.shapes.splice(i, 1);
				i--;
			}
			if (this.shapes[i]) {
				this.shapes[i].content.position.x += this.shapes[i].vx;
				this.shapes[i].content.position.y += this.shapes[i].vy;
				this.shapes[i].content.rotation += this.shapes[i].vr;
			}
		}
	}

	public init(): void {
		this.wrap.appendChild(this.app.view);
		this.wrap.appendChild(this.stats.dom);
		this.app.ticker.add(this.animation);
		this.refill();
		this.app.stage.addChild(this.shapeContainer);
		this.app.stage.addChild(this.mouseContainer);
		this.mouse.drawRect(-window.innerWidth, -window.innerHeight, window.innerWidth * 2, window.innerHeight * 2);
		this.mouse.beginFill(0xFFFFFF, 0.1);
		this.mouse.drawCircle(0, 0, Math.floor(window.innerHeight / 3));
		this.mouse.position.set(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2));
		this.mouse.filters = [new PIXI.filters.BlurFilter(300, 5)];
		this.mouseContainer.filters = [this.noise];
		this.mouseContainer.addChild(this.mouse);

		window.addEventListener('resize', this.onWindowResize);
		window.addEventListener('mousemove', this.mouseMove);
	}

	private mouseMove(e: MouseEvent): void {
		this.mouse.position.set(e.x, e.y);
	}

	private onWindowResize(): void {
		this.app.resizeTo = window;
		this.app.resize();
	}

}

export default Background;
