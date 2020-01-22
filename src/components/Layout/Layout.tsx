//? Core
import React, { FunctionComponent } from 'react';
//? Components
import Header from 'components/Header';
import Footer from 'components/Footer';

const Layout: FunctionComponent<ChildrenProperties> = ({ children }) => {
	return (
		<>
			<main>
				<Header />
				<section>
					{children}
				</section>
				<Footer />
			</main>
		</>
	);
};

export default Layout;
