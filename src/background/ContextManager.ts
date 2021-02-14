const squareDiagonalMultiplier = 1.4142135623730951;

class ContextManager {

	private canvas: HTMLCanvasElement;

	private ctx: CanvasRenderingContext2D;

	constructor(ctx: CanvasRenderingContext2D) {
		this.canvas = document.createElement('canvas');
		this.ctx = ctx;
	}

	drawRotatedSquareImage(src: CanvasImageSource, size: number, x: number, y: number, rotation: number): void {
		const maxSize = Math.ceil(size * squareDiagonalMultiplier);
		this.canvas.width = maxSize;
		this.canvas.height = maxSize;
		const tmpCtx = this.canvas.getContext('2d')!;
		tmpCtx.clearRect(0, 0, maxSize, maxSize);
		tmpCtx.save();
		tmpCtx.translate(maxSize / 2, maxSize / 2);
		tmpCtx.rotate(rotation * Math.PI / 180);
		tmpCtx.drawImage(src, -size / 2, -size / 2);
		tmpCtx.restore();
		this.ctx.drawImage(this.canvas, x, y);
	}

}

export default ContextManager;
