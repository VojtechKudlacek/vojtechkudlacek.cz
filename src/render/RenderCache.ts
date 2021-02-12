type DrawFunction = (ctx: CanvasRenderingContext2D, width: number, height: number) => void;

class RenderCache {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private width: number;
	private height: number;

	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;
		this.ctx = this.canvas.getContext('2d')!;
	}

	public draw(fn: DrawFunction): void {
		this.ctx.clearRect(0, 0, this.width, this.height);
		fn(this.ctx, this.width, this.height);
	}

	public get Content(): HTMLCanvasElement {
		return this.canvas;
	}

}

export default RenderCache;
