//? Core
import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';
//? Components
import Link from 'components/Link';

interface Properties {
	side: 'left' | 'right';
	to: string;
	children: string;
	sceneChanging: boolean;
}

const SideLink: FunctionComponent<Properties> = ({ children, to, side, sceneChanging }) => {
	const props = useSpring({
		opacity: sceneChanging ? 0 : 1,
		from: { opacity: 0 },
		config: { duration: 900 }
	});
	return (
		<Link to={to}>
			<animated.div style={props} className={`${side === 'left' ? 'leftLink' : 'rightLink'} link`}>
				<div className="text">
					<span>{children}</span>
				</div>
			</animated.div>
		</Link>
	);
};

export default SideLink;
