import * as PIXI from 'pixi.js';

interface Properties {
	container: PIXI.Container;
}

class MouseLight {

	private container: PIXI.Container;
	private mouse: PIXI.Graphics;
	private noise: PIXI.filters.NoiseFilter;

	constructor({ container }: Properties) {
		this.container = container;
		this.mouse = new PIXI.Graphics();
		this.noise = new PIXI.filters.NoiseFilter(1.5, 0.01);
	}

	public init(): void {
		this.mouse.drawRect(-window.innerHeight, -window.innerHeight, window.innerHeight * 2, window.innerHeight * 2);
		this.mouse.beginFill(0xFFFFFF, 0.1);
		this.mouse.drawCircle(0, 0, Math.floor(window.innerHeight / 3));
		this.mouse.position.set(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2));
		this.mouse.filters = [new PIXI.filters.BlurFilter(300, 5)];
		this.container.filters = [this.noise];
		this.container.addChild(this.mouse);
	}

	public updatePosition(x: number, y: number): void {
		this.mouse.position.set(x, y);
	}

	public noiseTick(): void {
		this.noise.seed = Math.random();
	}

}

export default MouseLight;
