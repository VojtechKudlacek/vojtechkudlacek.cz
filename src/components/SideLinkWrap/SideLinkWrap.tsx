//? Core
import React, { FunctionComponent } from 'react';

const SideLinkWrap: FunctionComponent = ({ children }) => {
	return (
		<div className="sideLinks">
			{children}
		</div>
	);
};

export default SideLinkWrap;
