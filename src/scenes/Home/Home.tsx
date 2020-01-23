//? Core
import React, { FunctionComponent } from 'react';
//? Components
import SideLink from 'components/SideLink';
import SideLinkWrap from 'components/SideLinkWrap';
import BackgroundImage from 'components/BackgroundImage';
import BackgroundWrap from 'components/BackgroundWrap';
import Content from 'components/Content';
import PowerOfJavaScript from 'components/PowerOfJavaScript';
import Title from 'components/HomeTitle';

interface Properties {
	sceneChanging: boolean;
}

const Home: FunctionComponent<Properties> = ({ sceneChanging }) => {
	return (
		<>
			<BackgroundWrap>
				<BackgroundImage image="home" />
				<PowerOfJavaScript sceneChanging={sceneChanging} />
			</BackgroundWrap>
			<Content>
				<Title sceneChanging={sceneChanging} />
			</Content>
			<SideLinkWrap>
				<SideLink to="/bio" side="left">Bio</SideLink>
				<SideLink to="/projects" side="right">Projects</SideLink>
			</SideLinkWrap>
		</>
	);
};

export default Home;
