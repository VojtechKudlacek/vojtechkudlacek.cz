import { randomFloatFromInterval } from 'utils/number';
import { randomItemFromArray } from 'utils/array';
import Shapes from './Shapes';

interface Velocity {
	vx: number;
	vy: number;
	vr: number;
}

class EntityFactory {

	private id: number;
	private size: number;
	private shapes: Shapes;

	constructor(size: number, thickness: number) {
		this.id = 0;
		this.size = size;
		this.shapes = new Shapes(size, '#fff', thickness);
	}

	private getShape(): CanvasImageSource {
		const s = this.shapes;
		return randomItemFromArray([s.Cross, s.Square, s.Triangle, s.Circle]);
	}

	private getVelocity(): Velocity {
		const vx = randomFloatFromInterval(-3, 3);
		const vy = randomFloatFromInterval(-3, 3);
		const vr = randomFloatFromInterval(-3, 3);
		return { vx, vy, vr };
	}

	public createEntity({ width, height }: Size): MovingObject {
		const { vx, vy, vr } = this.getVelocity();
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

}

export default EntityFactory;
