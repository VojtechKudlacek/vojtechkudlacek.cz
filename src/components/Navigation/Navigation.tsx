//? Core
import React, { FunctionComponent } from 'react';

interface Properties {
	count: number;
	activeIndex: number;
	setIndex: (index: number) => void;
}

const Navigation: FunctionComponent<Properties> = ({ count, activeIndex, setIndex }) => {
	const click = (index: number) => () => setIndex(index);
	return (
		<div className="navigation">
			{Array(count).fill(null).map((_, key) => (
				<div key={key} className={`navigationItem ${activeIndex === key ? 'active' : ''}`.trim()} onClick={click(key)} />
			))}
		</div>
	);
};

export default Navigation;
