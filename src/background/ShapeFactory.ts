import * as PIXI from 'pixi.js';
import { randomIntFromInterval, randomNegation } from 'utils/number';

interface Properties {
	size: number;
	thickness: number;
	alpha: number;
	minSpeed: number;
	maxSpeed: number;
}

class ShapeFactory {

	private stack: Array<() => PIXI.Graphics>;
	private size: number;
	private halfSize: number;
	private thickness: number;
	private alpha: number;
	private minSpeed: number;
	private maxSpeed: number;

	constructor({ alpha, maxSpeed, minSpeed, size, thickness }: Properties) {
		this.size = size;
		this.halfSize = size / 2;
		this.thickness = thickness;
		this.alpha = alpha;
		this.minSpeed = minSpeed;
		this.maxSpeed = maxSpeed;
		this.stack = [];
		this.createTriangle = this.createTriangle.bind(this);
		this.createSquare = this.createSquare.bind(this);
		this.createCircle = this.createCircle.bind(this);
		this.createCross = this.createCross.bind(this);
	}

	private setLineStyle(g: PIXI.Graphics): void {
		const color = Math.random() < 0.1 ? 0xFFFF00 : 0xFFFFFF;
		g.lineStyle(this.thickness, color, this.alpha);
	}

	private createTriangle(): PIXI.Graphics {
		const g = new PIXI.Graphics();
		const padding = this.size - Math.sqrt(Math.pow(this.size, 2) - Math.pow(this.halfSize, 2));
		g.pivot.set(this.halfSize, padding + (this.size * Math.sqrt(3) / 3));
		this.setLineStyle(g);
		g.drawPolygon([0, this.size, this.halfSize, padding, this.size, this.size]);
		return g;
	}

	private createSquare(): PIXI.Graphics {
		const g = new PIXI.Graphics();
		g.pivot.set(this.size / 2);
		this.setLineStyle(g);
		g.drawRect(0, 0, this.size, this.size);
		return g;
	}

	private createCircle(): PIXI.Graphics {
		const g = new PIXI.Graphics();
		g.pivot.set(this.halfSize);
		this.setLineStyle(g);
		g.drawCircle(this.halfSize, this.halfSize, this.halfSize);
		return g;
	}

	private createCross(): PIXI.Graphics {
		const g = new PIXI.Graphics();
		g.pivot.set(this.halfSize);
		this.setLineStyle(g);
		g.drawPolygon([0, 0, this.size, this.size, this.halfSize, this.halfSize, 0, this.size, this.size, 0, this.halfSize, this.halfSize]);
		return g;
	}

	private getRandomShape(): PIXI.Graphics {
		// Not really random yeah
		if (!this.stack.length) {
			this.stack = [this.createTriangle, this.createSquare, this.createCircle, this.createCross];
		}
		const fnIndex = randomIntFromInterval(0, this.stack.length - 1);
		return this.stack.splice(fnIndex, 1)[0]();
	}

	private getRandomRotation(): number {
		return randomNegation(randomIntFromInterval(2, 6) / 100);
	}

	public createShape(x: number, y: number, vx: number, vy: number): Shape {
		const content = this.getRandomShape();
		content.position.x = x;
		content.position.y = y;
		const speed = randomIntFromInterval(this.minSpeed * 100, this.maxSpeed * 100) / 100;
		const calculatedVx = speed * vx;
		const calculatedVy = speed * vy;
		const vr = this.getRandomRotation();
		return {
			content,
			size: this.size,
			slowProgression: 0,
			vx: calculatedVx,
			originalVx: calculatedVx,
			vy: calculatedVy,
			originalVy: calculatedVy,
			vr,
			originalVr: vr,
		};
	}

}

export default ShapeFactory;
