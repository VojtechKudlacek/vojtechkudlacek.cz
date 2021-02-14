import { randomFloatFromInterval, randomIntFromInterval, toOneDecimal } from 'utils/number';
import { randomItemFromArray } from 'utils/array';
import Shapes from './Shapes';

class EntityFactory {

	private id: number;
	private size: number;
	private shapes: Shapes;

	constructor(size: number, color: string, thickness: number) {
		this.id = 0;
		this.size = size;
		this.shapes = new Shapes(size, color, thickness);
		this.shapes.predraw();
	}

	private getShape(): CanvasImageSource {
		const s = this.shapes;
		return randomItemFromArray([s.Cross, s.Square, s.Triangle, s.Circle]);
	}

	private getVelocity(): Velocity {
		const vx = toOneDecimal(randomItemFromArray([randomFloatFromInterval(-3, -1), randomFloatFromInterval(1, 3)]));
		const vy = toOneDecimal(randomItemFromArray([randomFloatFromInterval(-3, -1), randomFloatFromInterval(1, 3)]));
		const vr = toOneDecimal((Math.abs(vx) + Math.abs(vy)) / 2) * (Math.random() < 0.5 ? -1 : 1);
		return { vx, vy, vr };
	}

	private getStartPosition(vx: number, vy: number, width: number, height: number): Position {
		let x: number;
		let y: number;
		if (Math.abs(vx) > Math.abs(vy)) {
			x = vx > 0 ? -this.size : width + this.size;
			y = randomIntFromInterval(0, height);
		} else {
			x = randomIntFromInterval(0, width);
			y = vy > 0 ? -this.size : height + this.size;
		}
		return { x, y };
	}

	public createEntity({ width, height }: Size): MovingObject {
		const { vx, vy, vr } = this.getVelocity();
		const { x, y } = this.getStartPosition(vx, vy, width, height);
		const r = randomIntFromInterval(0, 360);
		return {
			id: this.id++,
			x,
			y,
			r,
			vx,
			vy,
			vr,
			size: this.size,
			src: this.getShape(),
		};
	}

	public processEntity(e: MovingObject): void {
		e.x += e.vx;
		e.y += e.vy;
		e.r += e.vr;
		if (e.r > 360) {
			e.r -= 360;
		} else if (e.r < 0) {
			e.r += 360;
		}
	}

	public isOutOfscreen(e: MovingObject, { width, height }: Size): boolean {
		return (e.x < -e.size) || (e.x > (width + e.size)) || (e.y < -e.size) || (e.y > (height + e.size));
	}

}

export default EntityFactory;
