//? Core
import React, { FunctionComponent } from 'react';

const Content: FunctionComponent = ({ children }) => {
	return (
		<div className="content">
			<div className="contentAlign">
				{children}
			</div>
		</div>
	);
};

export default Content;
