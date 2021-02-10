import { FunctionComponent } from 'react';
import Background from 'components/Background';

const Layout: FunctionComponent<ChildrenProperties> = ({ children }) => {
	return (
		<>
			<Background />
			<nav />
			<div className="content">
				{children}
			</div>
			<footer />
		</>
	);
};

export default Layout;
