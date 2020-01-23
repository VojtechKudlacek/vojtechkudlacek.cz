//? Core
import React, { FunctionComponent } from 'react';
//? Components
import Header from 'components/Header';
import Footer from 'components/Footer';

const Layout: FunctionComponent<ChildrenProperties> = ({ children }) => {
	return (
		<>
			<Header />
			<section>
				{children}
			</section>
			<Footer />
		</>
	);
};

export default Layout;
