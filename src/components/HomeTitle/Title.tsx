//? Core
import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';
//? Utils
import { easeInOut } from 'utils/easingFunctions';
import { getHomeTitleSize } from 'utils/responsiveSizes';

interface Properties {
	sceneChanging: boolean;
}

const Title: FunctionComponent<Properties> = ({ sceneChanging }) => {
	const fullWidth: number = getHomeTitleSize();
	const props = useSpring({
		width: sceneChanging ? 0 : fullWidth,
		from: { width: 0 },
		delay: 200,
		config: {
			duration: sceneChanging ? 800 : 1800,
			easing: easeInOut
		}
	});
	return (
		<animated.div style={props} className="homeTitle">
			<img src="/images/vk.svg" alt="" style={{ width: fullWidth }} />
		</animated.div>
	);
};

export default Title;
