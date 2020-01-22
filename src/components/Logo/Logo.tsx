//? Core
import React, { Component, ReactNode } from 'react';
//? Components
import Link from 'components/Link';
//? Animation functions
import { animateLine, animateLogo, animateSmileyFace, animateSmileyEye } from './animations';

interface State {
	progress: number;
}

class Logo extends Component<EmptyProperties, State> {

	public state: State = { progress: 0 };
	private progressOrigin: number = 0;

	private animating: boolean = false;
	private hovered: boolean = false;

	ease = (x: number) => 1 - ((Math.cos(Math.PI * x) + 1) / 2);

	animate = () => {
		if (this.hovered && this.progressOrigin < 99) {
			this.progressOrigin += 4;
			if (this.progressOrigin > 99) {
				this.progressOrigin = 99;
			}
			requestAnimationFrame(this.animate);
		} else if (this.progressOrigin > 0 && !this.hovered) {
			this.progressOrigin -= 4;
			if (this.progressOrigin < 0) {
				this.progressOrigin = 0;
			}
			requestAnimationFrame(this.animate);
		} else {
			this.animating = false;
		}
		this.setState({ progress: this.ease(this.progressOrigin / 99) * 99 });
	}

	mouseEnter = (): void => {
		this.hovered = true;
		if (!this.animating) {
			this.animating = true;
			requestAnimationFrame(this.animate);
		}
	}

	mouseLeave = (): void => {
		this.hovered = false;
		if (!this.animating) {
			this.animating = true;
			requestAnimationFrame(this.animate);
		}
	}

	getSvgContent = (): ReactNode => {
		if (this.state.progress <= 33) {
			return <path fill="#ffffff" d={animateLogo(this.state.progress / 33)} />;
		} else if (this.state.progress <= 66) {
			return <path fill="#ffffff" d={animateLine((this.state.progress - 33) / 33)} />;
		}
		const progress = (this.state.progress - 66) / 33;
		const size = animateSmileyEye(progress);
		return (
			<>
				<circle cx="150" cy="128" r={size} fill="#ffffff" opacity={progress} />
				<circle cx="362" cy="128" r={size} fill="#ffffff" opacity={progress} />
				<path fill="#ffffff" d={animateSmileyFace(progress)} />
			</>
		);
	}

	render(): ReactNode {
		return (
			<Link to="/">
				<svg
					onMouseEnter={this.mouseEnter}
					onMouseLeave={this.mouseLeave}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					width="25"
					height="25"
				>
					{this.getSvgContent()}
				</svg>
			</Link>
		);
	}

}

export default Logo;
