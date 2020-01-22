//? Core
import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';

interface Properties {
	image: 'home' | 'bio' | 'projects';
	sceneChanging: boolean;
}

const BackgroundImage: FunctionComponent<Properties> = ({ image, sceneChanging }) => {
	const props = useSpring({
		opacity: sceneChanging ? 0 : 1,
		from: { opacity: 0 },
		config: {
			duration: sceneChanging ? 800 : 1500,
			easing: (x: number) => 1 - ((Math.cos(Math.PI * x) + 1) / 2)
		}
	});
	return <animated.div className={`backgroundImage ${image}`} style={props} />;
};

export default BackgroundImage;
