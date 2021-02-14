import { Component, createRef, RefObject } from 'react';
import Shapes from 'render/Shapes';
import ContextManager from 'render/ContextManager';

class Background extends Component {

	private canvasRef: RefObject<HTMLCanvasElement> = createRef();
	private canvas!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;
	private animating: boolean;

	private shapes!: Shapes;
	private ctxManager!: ContextManager;

	constructor(props: EmptyProperties) {
		super(props);
		this.animating = false;
		this.animate = this.animate.bind(this);
	}

	public componentDidMount(): void {
		this.canvas = this.canvasRef.current!;
		this.ctx = this.canvas.getContext('2d')!;
		this.shapes = new Shapes(32, '#fff', 1);
		this.ctxManager = new ContextManager(this.ctx);
		this.shapes.predraw();
		this.animating = true;
		this.animate();
	}

	public componentWillUnmount(): void {
		this.animating = false;
	}

	private rotation = 0;
	private canvasRender(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.rotation += 0.1;
		this.ctxManager.drawRotatedSquareImage(this.shapes.Circle, 32, 64, 64, this.rotation);
		this.ctxManager.drawRotatedSquareImage(this.shapes.Cross, 32, 125, 64, this.rotation);
		this.ctxManager.drawRotatedSquareImage(this.shapes.Square, 32, 192, 64, this.rotation);
		this.ctxManager.drawRotatedSquareImage(this.shapes.Triangle, 32, 256, 64, this.rotation);
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
