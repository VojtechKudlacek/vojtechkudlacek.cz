import { randomIntFromInterval, getDocumentHeight } from 'utils/number';

interface Properties {
	maxDepth: number;
	minSize: number;
	maxSize: number;
	maxSpeed: number;
	minSpeed: number;
}

class PointFactory {

	private id: number;
	private maxZ: number;
	private minSize: number;
	private maxSize: number;
	private maxSpeed: number;
	private minSpeed: number;

	public points: Array<Point> = [];
	public dynamicPoints: Array<DynamicPoint> = [];

	constructor({ maxDepth, minSize, maxSize, maxSpeed, minSpeed }: Properties) {
		this.id = 0;
		this.maxZ = maxDepth;
		this.minSize = minSize;
		this.maxSize = maxSize;
		this.maxSpeed = maxSpeed;
		this.minSpeed = minSpeed;
	}

	private isOutOfWindow(point: Point): boolean {
		return point.x < 0 || point.x > window.innerWidth || point.y < 0 || point.y > getDocumentHeight();
	}

	private calculateSize(z: number): number {
		return Math.ceil(((this.maxZ + 1) - z) / Math.floor(this.maxZ / (this.maxSize - this.minSize + 1))) + (this.minSize - 1);
	}

	private calculateSpeed(z: number): number {
		return Math.ceil(((this.maxZ + 1) - z) / Math.floor(this.maxZ / (this.maxSpeed - this.minSpeed + 1))) + (this.minSpeed - 1);
	}

	private getRandomDirection(): Vector {
		const vx = [-1, 0, 0, 1][randomIntFromInterval(0, 3)];
		const vy = vx ? 0 : [-1, 1][randomIntFromInterval(0, 1)];
		return { vx, vy };
	}

	public createDynamicPoints(amount: number = 1): void {
		for (let i = 0; i < amount; i++) {
			const { vx, vy } = this.getRandomDirection();
			const x = vy ? randomIntFromInterval(0, window.innerWidth) : vx === 1 ? 0 : window.innerWidth;
			const y = vx ? randomIntFromInterval(0, getDocumentHeight()) : vy === 1 ? 0 : getDocumentHeight();
			const z = randomIntFromInterval(0, this.maxZ);
			this.dynamicPoints.push({ x, y, z, vx, vy, id: this.id++, speed: this.calculateSpeed(z), size: this.calculateSize(z) });
		}
	}

	public processPoints(): void {
		let deleteCount = 0;
		for (let i = 0; i < this.dynamicPoints.length; i++) {
			this.dynamicPoints[i].x += this.dynamicPoints[i].vx * this.dynamicPoints[i].speed;
			this.dynamicPoints[i].y += this.dynamicPoints[i].vy * this.dynamicPoints[i].speed;
			if (this.isOutOfWindow(this.dynamicPoints[i])) {
				this.dynamicPoints.splice(i--, 1);
				deleteCount++;
			}
		}
		if (deleteCount) {
			this.createDynamicPoints(deleteCount);
		}
	}

}

export default PointFactory;
