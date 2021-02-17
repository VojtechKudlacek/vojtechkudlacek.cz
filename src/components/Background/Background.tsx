import { Component, createRef, RefObject } from 'react';
import AnimatedBackground from 'background/Background';

class Background extends Component {

	private rendererWrap: RefObject<HTMLDivElement> = createRef();

	public componentDidMount(): void {
		const wrap = this.rendererWrap.current!;
		const bg = new AnimatedBackground(wrap);
		bg.init();
	}

	public render(): JSX.Element {
		return <div className="background" ref={this.rendererWrap} />;
	}

}

export default Background;
