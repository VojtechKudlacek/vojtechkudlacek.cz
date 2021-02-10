import { Component, createRef, RefObject } from 'react';
import PointFactory from './points/PointFactory';
import { delay } from 'utils/async';

class Background extends Component {

	private canvasRef: RefObject<HTMLCanvasElement> = createRef();
	private canvas!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;
	private animating: boolean;

	private pointFactory: PointFactory;

	constructor(props: EmptyProperties) {
		super(props);
		this.pointFactory = new PointFactory({
			maxDepth: 20,
			minSize: 1,
			maxSize: 8,
			minSpeed: 1,
			maxSpeed: 3,
		});
		this.animating = false;
		this.animate = this.animate.bind(this);
	}

	private async createDynamicPoints(amount: number, timeGap: number): Promise<void> {
		if (amount) {
			this.pointFactory.createDynamicPoints();
			await delay(timeGap);
			this.createDynamicPoints(amount - 1, timeGap);
		}
	}

	public componentDidMount(): void {
		this.canvas = this.canvasRef.current!;
		this.ctx = this.canvas.getContext('2d')!;
		this.createDynamicPoints(20, 500);
		this.animating = true;
		this.animate();
	}

	public componentWillUnmount(): void {
		this.animating = false;
	}

	private canvasRender(): void {
		const dynamicPoints = this.pointFactory.dynamicPoints;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let i = 0; i < dynamicPoints.length; i++) {
			const point = dynamicPoints[i];
			this.ctx.fillStyle = '#fff';
			this.ctx.beginPath();
			this.ctx.arc(point.x, point.y - window.scrollY, point.size, 0, 2 * Math.PI);
			this.ctx.closePath();
			this.ctx.fill();
		}
	}

	private animate(): void {
		if (this.animating) {
			requestAnimationFrame(this.animate);
		}
		this.pointFactory.processPoints();
		this.canvasRender();
	}

	public render(): JSX.Element {
		return <canvas className="background" ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight} />;
	}

}

export default Background;
