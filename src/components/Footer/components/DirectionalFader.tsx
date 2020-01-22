//? Core
import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';

interface Properties {
	className?: string;
	delay: number;
}

const DirectionalFader: FunctionComponent<Properties> = ({ children, className, delay }) => {
	const props = useSpring({
		opacity: 1,
		top: 0,
		from: { opacity: 0, top: 10 },
		config: { duration: 500 },
		delay
	});
	return <animated.span className={className} style={{ ...props, position: 'relative' }}>{children}</animated.span>;
};

export default DirectionalFader;
