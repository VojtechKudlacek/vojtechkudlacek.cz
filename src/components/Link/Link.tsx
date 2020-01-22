import React, { FunctionComponent, ReactNode, MouseEvent } from 'react';
import history from 'services/history';

interface Properties {
	className?: string;
	children?: ReactNode;
	to: string;
	sceneChanging: boolean;
	setScreenChaning: (isChaning: boolean) => void;
}

const Link: FunctionComponent<Properties> = ({ className, children, to, sceneChanging, setScreenChaning }) => {
	const click = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (!sceneChanging) {
			setScreenChaning(true);
			setTimeout(() => {
				history.push(to);
				setScreenChaning(false);
			}, 1000);
		}
	};
	return <a className={className} href={to} onClick={click}>{children}</a>;
};

export default Link;
