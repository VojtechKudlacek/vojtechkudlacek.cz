class ContextManager {

	private ctx: CanvasRenderingContext2D;

	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
	}

	drawImage(src: CanvasImageSource, x: number, y: number) {
		this.ctx.drawImage(src, x, y);
	}

}

export default ContextManager;
