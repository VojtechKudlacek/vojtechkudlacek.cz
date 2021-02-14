import { Component, createRef, RefObject } from 'react';
import AnimatedBackground from 'background/Background';

class Background extends Component {

	private canvasRef: RefObject<HTMLCanvasElement> = createRef();

	private bg!: AnimatedBackground;

	public componentDidMount(): void {
		const canvas = this.canvasRef.current!;
		this.bg = new AnimatedBackground(canvas, 15);
		this.bg.init();
	}

	public componentWillUnmount(): void {
		this.bg.terminate();
	}

	public render(): JSX.Element {
		return <canvas className="background" ref={this.canvasRef} width={window.innerWidth} height={window.innerHeight} />;
	}

}

export default Background;
