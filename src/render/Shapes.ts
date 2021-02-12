import { power } from 'utils/number';
import RenderCache from './RenderCache';

class Shapes {

	private thickness: number;
	private color: string;

	private square: RenderCache;
	private triangle: RenderCache;
	private circle: RenderCache;
	private cross: RenderCache;

	constructor(size: number, color: string, thickness: number) {
		this.square = new RenderCache(size, size);
		this.triangle = new RenderCache(size, size);
		this.circle = new RenderCache(size, size);
		this.cross = new RenderCache(size, size);
		this.thickness = thickness;
		this.color = color;
	}

	public predraw(): void {
		const offset = Math.ceil(this.thickness / 2);
		this.square.draw((ctx, size) => {
			ctx.strokeStyle = this.color;
			ctx.lineWidth = this.thickness;
			ctx.beginPath();
			ctx.moveTo(offset, offset);
			ctx.lineTo(size - offset, offset);
			ctx.lineTo(size - offset, size - offset);
			ctx.lineTo(offset, size - offset);
			ctx.lineTo(offset, offset);
			ctx.closePath();
			ctx.stroke();
		});
		this.triangle.draw((ctx, size) => {
			const triangleHeight = Math.round(Math.sqrt(power(size) - power(size / 2)));
			const yOffset = Math.floor((size - triangleHeight) / 2);
			ctx.strokeStyle = this.color;
			ctx.lineWidth = this.thickness;
			ctx.beginPath();
			ctx.moveTo(offset, size - yOffset);
			ctx.lineTo(Math.floor(size / 2), yOffset);
			ctx.lineTo(size - offset, size - yOffset);
			ctx.lineTo(offset, size - yOffset);
			ctx.closePath();
			ctx.stroke();
		});
		this.circle.draw((ctx, size) => {
			ctx.strokeStyle = this.color;
			ctx.lineWidth = this.thickness;
			ctx.beginPath();
			ctx.arc(Math.floor(size / 2), Math.floor(size / 2), Math.floor(size / 2) - offset, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.stroke();
		});
		this.cross.draw((ctx, size) => {
			ctx.strokeStyle = this.color;
			ctx.lineWidth = this.thickness;
			ctx.arc(Math.floor(size / 2), Math.floor(size / 2), size - (offset * 2), 0, 2 * Math.PI);
			ctx.beginPath();
			ctx.moveTo(offset, offset);
			ctx.lineTo(size - offset, size - offset);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(offset, size - offset);
			ctx.lineTo(size - offset, offset);
			ctx.closePath();
			ctx.stroke();
		});
	}

	public get Square(): HTMLCanvasElement {
		return this.square.Content;
	}

	public get Triangle(): HTMLCanvasElement {
		return this.triangle.Content;
	}

	public get Circle(): HTMLCanvasElement {
		return this.circle.Content;
	}

	public get Cross(): HTMLCanvasElement {
		return this.cross.Content;
	}

}

export default Shapes;
