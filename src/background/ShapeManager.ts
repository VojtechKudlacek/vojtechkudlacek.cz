import * as PIXI from 'pixi.js';
import { randomIntFromInterval } from 'utils/number';
import ShapeFactory from './ShapeFactory';

interface Properties {
	size: number;
	thickness: number;
	alpha: number;
	minSpeed: number;
	maxSpeed: number;
	container: PIXI.Container;
	perExplosion: number;
	perExplosionRange: number;
	maxCount: number;
}

class ShapeManager {

	private container: PIXI.Container;
	private shapeFactory: ShapeFactory;
	private shapes: Array<Shape>;
	private perExplosion: number;
	private perExplosionRange: number;
	private maxCount: number;

	constructor(props: Properties) {
		this.shapes = [];
		this.perExplosion = props.perExplosion;
		this.perExplosionRange = props.perExplosionRange;
		this.maxCount = props.maxCount;
		this.container = props.container;
		this.shapeFactory = new ShapeFactory(props);
	}

	private isOutOfscreen(e: Shape, width: number, height: number): boolean {
		return (e.content.position.x < -e.size) || (e.content.position.x > (width + e.size)) || (e.content.position.y < -e.size) || (e.content.position.y > (height + e.size));
	}

	private calculateSpeed(originalSpeed: number, slowProgression: number): number {
		return originalSpeed - (originalSpeed * 0.5 * slowProgression);
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
				if (this.shapes[i].slowProgression < 1) {
					this.shapes[i].slowProgression += 0.005;
					this.shapes[i].vx = this.calculateSpeed(this.shapes[i].originalVx, this.shapes[i].slowProgression);
					this.shapes[i].vy = this.calculateSpeed(this.shapes[i].originalVy, this.shapes[i].slowProgression);
					this.shapes[i].vr = this.calculateSpeed(this.shapes[i].originalVr, this.shapes[i].slowProgression);
				}
			}
		}
	}

	public explosion(x: number, y: number): void {
		const amount = Math.min(this.maxCount - this.shapes.length, randomIntFromInterval(
			this.perExplosion - this.perExplosionRange, this.perExplosion + this.perExplosionRange
		));
		const startAngle = randomIntFromInterval(0, (Math.PI * 2) * 100) / 100;
		for (let i = 0; i < amount; i++) {
			const angle = (i / amount) * (Math.PI * 2);
			const shape = this.shapeFactory.createShape(x, y, Math.cos(startAngle + angle), Math.sin(startAngle + angle));
			this.container.addChild(shape.content);
			this.shapes.push(shape);
		}
	}

}

export default ShapeManager;
