import * as PIXI from 'pixi.js';
import ShapeFactory from './ShapeFactory';

class ShapeManager {

	private container: PIXI.Container;
	private shapeFactory: ShapeFactory;
	private shapes: Array<Shape>;
	private maxCount: number;

	constructor(container: PIXI.Container, maxCount: number = 10) {
		this.shapes = [];
		this.maxCount = maxCount;
		this.container = container;
		this.shapeFactory = new ShapeFactory();
	}

	private isOutOfscreen(e: Shape, width: number, height: number): boolean {
		return (e.content.position.x < -e.size) || (e.content.position.x > (width + e.size)) || (e.content.position.y < -e.size) || (e.content.position.y > (height + e.size));
	}

	public process(): void {
		for (let i = 0; i < this.shapes.length; i++) {
			if (this.isOutOfscreen(this.shapes[i], window.innerWidth, window.innerHeight)) {
				this.container.removeChild(this.shapes[i].content);
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
		// Would be nice to clear this at some point
		// But it should be killed once the whole app is killed
		// So I think it's okay?
		// Destructors would be nice in JS. :)
		setInterval(() => {
			if (this.shapes.length < this.maxCount) {
				const shape = this.shapeFactory.createShape(12, 1);
				this.shapes.push(shape);
				this.container.addChild(shape.content);
			}
		}, 1000);
	}

}

export default ShapeManager;
