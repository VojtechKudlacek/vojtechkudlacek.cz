//? Core
import React, { FunctionComponent } from 'react';

const BackgroundWrap: FunctionComponent = ({ children }) => {
	return (
		<div className="background">
			{children}
		</div>
	);
};

export default BackgroundWrap;
