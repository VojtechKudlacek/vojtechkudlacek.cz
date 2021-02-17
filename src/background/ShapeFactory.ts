import * as THREE from 'three';
import { randomItemFromArray } from 'utils/array';
import { toNDecimals, randomFloatFromInterval, randomIntFromInterval } from 'utils/number';

class ShapeFactory {

	private material: THREE.MeshBasicMaterial;

	constructor() {
		this.material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
		this.createTriangle = this.createTriangle.bind(this);
		this.createSquare = this.createSquare.bind(this);
		this.createCircle = this.createCircle.bind(this);
	}

	private createTriangle(size: number, thickness: number): THREE.Mesh {
		const geometry = new THREE.RingGeometry(size, size - thickness, 3);
		return new THREE.Mesh(geometry, this.material);
	}

	private createSquare(size: number, thickness: number): THREE.Mesh {
		const geometry = new THREE.RingGeometry(size, size - thickness, 4);
		return new THREE.Mesh(geometry, this.material);
	}

	private createCircle(size: number, thickness: number): THREE.Mesh {
		const geometry = new THREE.RingGeometry(size, size - thickness, 16);
		return new THREE.Mesh(geometry, this.material);
	}

	private getRandomMesh(size: number, thickness: number): THREE.Mesh {
		const meshGenerators = [this.createTriangle, this.createSquare, this.createCircle];
		return randomItemFromArray(meshGenerators)(size, thickness);
	}

	private getVelocity(): Velocity {
		const vx = toNDecimals(randomItemFromArray([randomFloatFromInterval(-2, -0.1), randomFloatFromInterval(0.1, 2)]), 2);
		const vy = toNDecimals(randomItemFromArray([randomFloatFromInterval(-2, -0.1), randomFloatFromInterval(0.1, 2)]), 2);
		const vr = toNDecimals(randomItemFromArray([randomFloatFromInterval(-1, -0.1), randomFloatFromInterval(0.1, 1)]), 2);
		return { vx, vy, vr };
	}

	private getStartPosition(size: number, vx: number, vy: number, xMax: number, yMax: number): Position {
		if (Math.abs(vx) > Math.abs(vy)) {
			return {
				x: vx > 0 ? -(xMax + size) : (xMax + size),
				y: randomIntFromInterval(-yMax, yMax),
			};
		}
		return {
			x: randomIntFromInterval(-xMax, xMax),
			y: vy > 0 ? -(yMax + size) : (yMax + size),
		};
	}

	public createShape(size: number, thickness: number, xMax: number, yMax: number): Shape {
		const { vx, vy, vr } = this.getVelocity();
		const { x, y } = this.getStartPosition(size, vx, vy, xMax, yMax);
		console.log({ vx, vy, vr, x, y });
		const mesh = this.getRandomMesh(size, thickness);
		mesh.position.x = x;
		mesh.position.y = y;
		return { mesh, vx, vy, vr };
	}

}

export default ShapeFactory;
