import * as PIXI from 'pixi.js';
import ShapeFactory from './ShapeFactory';

class Background {

	private wrap: HTMLDivElement;
	private app: PIXI.Application;

	private shapeFactory: ShapeFactory;
	private shapes: Array<Shape>;

	constructor(wrap: HTMLDivElement) {
		this.wrap = wrap;
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x000000,
			resolution: window.devicePixelRatio || 1,
		});
		this.shapeFactory = new ShapeFactory();
		this.shapes = [];
		this.animation = this.animation.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
	}

	private refill(): void {
		setInterval(() => {
			if (this.shapes.length < 20) {
				const shape = this.shapeFactory.createShape(16, 1);
				this.shapes.push(shape);
				this.app.stage.addChild(shape.content);
			}
		}, 500);
	}

	private animation(): void {
		for (let i = 0; i < this.shapes.length; i++) {
			if (this.shapeFactory.isOutOfscreen(this.shapes[i], window.innerWidth, window.innerHeight)) {
				this.app.stage.removeChild(this.shapes[i].content);
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
		this.app.ticker.add(this.animation);
		this.refill();
		window.addEventListener('resize', this.onWindowResize);
	}

	private onWindowResize(): void {
		this.app.resizeTo = window;
		this.app.resize();
	}

}

export default Background;
