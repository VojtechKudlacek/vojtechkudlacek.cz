//? Core
import React, { FunctionComponent, ReactNode } from 'react';
import { useSpring, animated } from 'react-spring';
//? Utils
import { easeInOut } from 'utils/easingFunctions';
import { getBioWidth } from 'utils/responsiveSizes';

interface Properties {
	title: string;
	delay: number;
	requiredWidth: number;
	children: ReactNode;
	sceneChanging: boolean;
}

const TextSection: FunctionComponent<Properties> = ({ children, title, delay, requiredWidth, sceneChanging }) => {
	const width = getBioWidth(requiredWidth);
	const props = useSpring({
		width: sceneChanging ? 0 : width,
		from: { width: 0 },
		delay: sceneChanging ? 0 : delay,
		config: { duration: 1000, easing: easeInOut }
	});
	return (
		<animated.div style={props} className="textSection">
			<div className="sectionWrap" style={{ width }}>
				<h2>{title}</h2>
				<div className="sectionContent">
					{children}
				</div>
			</div>
		</animated.div>
	);
};

export default TextSection;
