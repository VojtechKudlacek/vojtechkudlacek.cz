//? Core
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
//? Store
import store from 'store';
//? Services
import history from 'services/history';
//? Scenes
import Home from 'scenes/Home';
import Projects from 'scenes/Projects';
import Bio from 'scenes/Bio';
//? Components
import Layout from 'components/Layout';
import Preloader from 'components/Preloader';
//? Styles
import 'styles/styles.scss';

const App: FunctionComponent = () => {
	const [windowWidth, updateWindowWidth] = useState<number>(window.innerWidth);
	useEffect(() => {
		// Some optimalization of resize event
		let resizing: boolean = false;
		const onResize = () => {
			if (!resizing && windowWidth !== window.innerWidth) {
				resizing = true;
				setTimeout(() => {
					resizing = false;
					updateWindowWidth(window.innerWidth);
				}, 1000);
			}
		};
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});
	return (
		<Provider store={store}>
			<Router history={history}>
				<Preloader>
					<Layout>
						<Switch>
							<Route path="/projects" component={Projects} />
							<Route path="/bio" component={Bio} />
							<Route path="/" component={Home} />
						</Switch>
					</Layout>
				</Preloader>
			</Router>
		</Provider>
	);
};

export default App;
