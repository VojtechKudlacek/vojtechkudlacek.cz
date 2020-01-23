//? Core
import React, { FunctionComponent, ReactNode } from 'react';
import { useSpring, animated } from 'react-spring';
//? Utils
import { easeInOut } from 'utils/easingFunctions';

interface Properties {
	title: string;
	delayIn: number;
	delayOut: number;
	requiredWidth: number;
	children: ReactNode;
	sceneChanging: boolean;
}

const TextSection: FunctionComponent<Properties> = ({ children, title, delayIn, delayOut, requiredWidth, sceneChanging }) => {
	const props = useSpring({
		width: sceneChanging ? 0 : requiredWidth,
		from: { width: 0 },
		delay: sceneChanging ? delayOut : delayIn,
		config: { duration: sceneChanging ? 1000 - delayOut : 1000, easing: easeInOut }
	});
	return (
		<animated.div style={props} className="textSection">
			<div className="sectionWrap" style={{ width: requiredWidth }}>
				<h2>{title}</h2>
				<div className="sectionContent">
					{children}
				</div>
			</div>
		</animated.div>
	);
};

export default TextSection;
