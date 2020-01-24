//? Core
import React, { FunctionComponent } from 'react';
//? Components
import Header from 'components/Header';
import Section from 'components/Section';
import Footer from 'components/Footer';

const Layout: FunctionComponent<ChildrenProperties> = ({ children }) => {
	return (
		<>
			<Header />
			<Section>
				{children}
			</Section>
			<Footer />
		</>
	);
};

export default Layout;
