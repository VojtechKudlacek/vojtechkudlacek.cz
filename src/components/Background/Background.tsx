import { Component, createRef, RefObject } from 'react';
import Shapes from 'render/Shapes';

class Background extends Component {

	private canvasRef: RefObject<HTMLCanvasElement> = createRef();
	private canvas!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;
	private animating: boolean;

	private shapes: Shapes;

	constructor(props: EmptyProperties) {
		super(props);
		this.shapes = new Shapes(32, '#fff', 1);
		this.animating = false;
		this.animate = this.animate.bind(this);
	}

	public componentDidMount(): void {
		this.canvas = this.canvasRef.current!;
		this.ctx = this.canvas.getContext('2d')!;
		this.shapes.predraw();
		this.animating = true;
		this.animate();
	}

	public componentWillUnmount(): void {
		this.animating = false;
	}

	private canvasRender(): void {
		this.ctx.drawImage(this.shapes.Circle, 64, 64);
		this.ctx.drawImage(this.shapes.Cross, 125, 64);
		this.ctx.drawImage(this.shapes.Square, 192, 64);
		this.ctx.drawImage(this.shapes.Triangle, 256, 64);
	}

	private animate(): void {
		if (this.animating) {
			requestAnimationFrame(this.animate);
		}
		this.canvasRender();
	}

	public render(): JSX.Element {
		return <canvas className="background" ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight} />;
	}

}

export default Background;
