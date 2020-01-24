//? Core
import React, { FunctionComponent } from 'react';
//? Components
import Link from 'components/Link';

interface Properties {
	side: 'left' | 'right';
	to: string;
	children: string;
}

const SideLink: FunctionComponent<Properties> = ({ children, to, side }) => {
	return (
		<Link to={to}>
			<div className={`${side === 'left' ? 'leftLink' : 'rightLink'} link`}>
				<div className="text">
					<span>{children}</span>
				</div>
			</div>
		</Link>
	);
};

export default SideLink;
