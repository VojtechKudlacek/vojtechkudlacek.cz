import * as PIXI from 'pixi.js';

interface Properties {
	thickness: number;
	alpha: number;
	container: PIXI.Container;
	ratio: number;
}

interface ProjectionObject {
	z: number;
	d: boolean;
	g: PIXI.Graphics;
}

class Projection {

	private container: PIXI.Container;
	private projections: Array<ProjectionObject>;
	private ratio: number;
	private thickness: number;
	private alpha: number;

	constructor({ container, ratio, alpha, thickness }: Properties) {
		this.alpha = alpha;
		this.thickness = thickness;
		this.container = container;
		this.projections = [];
		this.ratio = ratio;
	}

	private setLineStyle(g: PIXI.Graphics): void {
		g.lineStyle(this.thickness, 0xffffff, this.alpha);
	}

	private createProjection(z: number, d: boolean, fn: (g: PIXI.Graphics, ratio: number) => void): ProjectionObject {
		const g = new PIXI.Graphics();
		this.setLineStyle(g);
		fn(g, this.ratio);
		return { z, d, g };
	}

	private createSquare(size: number, z: number, d: boolean = true): ProjectionObject {
		const halfSize = size / 2;
		const projection = this.createProjection(z, d, (g, ratio) => {
			g.drawRect(-halfSize * ratio, -halfSize * ratio, size * ratio, size * ratio);
		});
		projection.z = z;
		return projection;
	}

	private createRotatedSquare(size: number, rotation: number, z: number, d: boolean = true): ProjectionObject {
		const projection = this.createSquare(size, z, d);
		projection.g.rotation = rotation;
		return projection;
	}

	private createCircle(size: number, z: number, d: boolean = true): ProjectionObject {
		const projection = this.createProjection(z, d, (g, ratio) => {
			const halfSize = size / 2;
			g.drawCircle(0, 0, halfSize * ratio);
		});
		projection.z = z;
		return projection;
	}

	public init(): void {
		this.container.position.set(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2));
		this.projections.push(this.createSquare(10, 25));
		this.projections.push(this.createRotatedSquare(10, -(Math.PI / 6), 25));
		this.projections.push(this.createRotatedSquare(10, (Math.PI / 6), 25));
		this.projections.push(this.createCircle(16, 10));
		this.projections.push(this.createCircle(23, 50));
		this.projections.push(this.createCircle(25, 60));
		this.projections.push(this.createCircle(26, 70));
		this.projections.push(this.createCircle(40, 120));
		this.projections.push(this.createRotatedSquare(41, (Math.PI / 4), 25));
		this.projections.push(this.createCircle(55, 140));
		this.projections.push(this.createCircle(60, 160));
		this.projections.push(this.createCircle(80, 200));
		for (const { g } of this.projections) {
			this.container.addChild(g);
		}
	}

	public updatePosition(x: number, y: number): void {
		const xOffset = (2 * x / window.innerWidth) - 1;
		const yOffset = (2 * y / window.innerHeight) - 1;
		for (const { g, d, z } of this.projections) {
			if (d) {
				g.position.set(-(xOffset * z), -(yOffset * z));
			}
		}
	}

}

export default Projection;
