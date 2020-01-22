//? Core
import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';
//? Components
import Logo from 'components/Logo';
import SourceCode from 'components/SourceCode';

const Header: FunctionComponent = () => {
	const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } });
	return (
		<animated.header style={props}>
			<div className="logo">
				<Logo />
			</div>
			<div className="toolbar">
				<SourceCode />
			</div>
		</animated.header>
	);
};

export default Header;
