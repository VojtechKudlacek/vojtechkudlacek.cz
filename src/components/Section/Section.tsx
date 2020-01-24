//? Core
import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';
//? Utils
import { easeOut } from 'utils/easingFunctions';

interface Properties extends ChildrenProperties {
	sceneChanging: boolean;
}

const Section: FunctionComponent<Properties> = ({ children, sceneChanging }) => {
	const props = useSpring({
		opacity: sceneChanging ? 0 : 1,
		from: { opacity: 0 },
		config: { duration: 1000, easing: easeOut }
	});
	return <animated.section style={props}>{children}</animated.section>;
};

export default Section;
