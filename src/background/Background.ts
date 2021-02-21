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
		this.refill();
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
		this.app.stage.addChild(this.test.a);
		this.app.stage.addChild(this.test.b);
		this.app.stage.addChild(this.test.c);
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
