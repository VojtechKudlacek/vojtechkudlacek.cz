import * as PIXI from 'pixi.js';
import { randomItemFromArray } from 'utils/array';
import { toNDecimals, randomFloatFromInterval, randomIntFromInterval } from 'utils/number';

class ShapeFactory {

	private stack: Array<(size: number, thickness: number) => PIXI.Graphics>;

	constructor() {
		this.stack = [];
		this.createTriangle = this.createTriangle.bind(this);
		this.createSquare = this.createSquare.bind(this);
		this.createCircle = this.createCircle.bind(this);
		this.createCross = this.createCross.bind(this);
	}

	private createTriangle(size: number, thickness: number): PIXI.Graphics {
		const g = new PIXI.Graphics();
		const halfSize = size / 2;
		const padding = size - Math.sqrt(Math.pow(size, 2) - Math.pow(halfSize, 2));
		g.pivot.set(halfSize, padding + (size * Math.sqrt(3) / 3));
		g.lineStyle(thickness, 0xFFFFFF, 1);
		g.drawPolygon([0, size, halfSize, padding, size, size]);
		return g;
	}

	private createSquare(size: number, thickness: number): PIXI.Graphics {
		const g = new PIXI.Graphics();
		g.pivot.set(size / 2);
		g.lineStyle(thickness, 0xFFFFFF, 1);
		g.drawRect(0, 0, size, size);
		return g;
	}

	private createCircle(size: number, thickness: number): PIXI.Graphics {
		const g = new PIXI.Graphics();
		const halfSize = size / 2;
		g.pivot.set(halfSize);
		g.lineStyle(thickness, 0xFFFFFF, 1);
		g.drawCircle(halfSize, halfSize, halfSize);
		return g;
	}

	private createCross(size: number, thickness: number): PIXI.Graphics {
		const g = new PIXI.Graphics();
		const halfSize = size / 2;
		g.pivot.set(halfSize);
		g.lineStyle(thickness, 0xFFFFFF, 1);
		g.drawPolygon([0, 0, size, size, halfSize, halfSize, 0, size, size, 0, halfSize, halfSize]);
		return g;
	}

	private getRandomShape(size: number, thickness: number): PIXI.Graphics {
		// Not really random yeah
		if (!this.stack.length) {
			this.stack = [this.createTriangle, this.createSquare, this.createCircle, this.createCross];
		}
		const fnIndex = randomIntFromInterval(0, this.stack.length - 1);
		return this.stack.splice(fnIndex, 1)[0](size, thickness);
	}

	private getVelocity(): Velocity {
		const vx = toNDecimals(randomItemFromArray([randomFloatFromInterval(-3, -1), randomFloatFromInterval(1, 3)]), 2);
		const vy = toNDecimals(randomItemFromArray([randomFloatFromInterval(-3, -1), randomFloatFromInterval(1, 3)]), 2);
		const vr = toNDecimals(randomItemFromArray([randomFloatFromInterval(-0.1, -0.02), randomFloatFromInterval(0.02, 0.1)]), 2);
		return { vx, vy, vr };
	}

	private getStartPosition(size: number, vx: number, vy: number): Position {
		if (Math.abs(vx) > Math.abs(vy)) {
			return {
				x: vx > 0 ? -(size) : (window.innerWidth + size),
				y: vy > 0 ? randomIntFromInterval(0, window.innerHeight / 2) : randomIntFromInterval(window.innerHeight / 2, window.innerHeight),
			};
		}
		return {
			x: vx > 0 ? randomIntFromInterval(0, window.innerWidth / 2) : randomIntFromInterval(window.innerWidth / 2, window.innerWidth),
			y: vy > 0 ? -(size) : (window.innerHeight + size),
		};
	}

	public createShape(size: number, thickness: number): Shape {
		const { vx, vy, vr } = this.getVelocity();
		const { x, y } = this.getStartPosition(size, vx, vy);
		const content = this.getRandomShape(size, thickness);
		content.position.x = x;
		content.position.y = y;
		return { content, size, vx, vy, vr };
	}

	public isOutOfscreen(e: Shape, width: number, height: number): boolean {
		return (e.content.position.x < -e.size) || (e.content.position.x > (width + e.size)) || (e.content.position.y < -e.size) || (e.content.position.y > (height + e.size));
	}

}

export default ShapeFactory;
