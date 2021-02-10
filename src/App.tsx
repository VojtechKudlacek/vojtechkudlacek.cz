import React, { Component } from 'react';
import resizeControl from 'services/resize';
import Layout from 'components/Layout';
import 'styles/app.scss';

class App extends Component {

	constructor(props: EmptyProperties) {
		super(props);
		this.onResize = this.onResize.bind(this);
	}

	private onResize(): void {
		this.forceUpdate();
	}

	public componentDidMount(): void {
		resizeControl.subscribe(this.onResize);
	}

	public componentWillUnmount(): void {
		resizeControl.unsubscribe(this.onResize);
	}

	public render(): JSX.Element {
		return (
			<Layout>
				{''}
			</Layout>
		);
	}

}

export default App;
