//? Core
import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';
//? Utils
import useControl from './utils/controlHook';
import projects from './utils/projectList';
//? Components
import Navigation from 'components/Navigation';
import SideLink from 'components/SideLink';
import SideLinkWrap from 'components/SideLinkWrap';
import Content from 'components/Content';
import BackgroundWrap from 'components/BackgroundWrap';
import ProjectSlideshow from 'components/ProjectSlideshow';
import BackgroundImage from 'components/BackgroundImage';

interface Properties {
	sceneChanging: boolean;
}

const References: FunctionComponent<Properties> = ({ sceneChanging }) => {
	const changeduration = 400;
	const [state, setIndex] = useControl(changeduration);
	const props = useSpring({
		opacity: sceneChanging ? 0 : 1,
		from: { opacity: 0 },
		config: { duration: 800 }
	});
	return (
		<>
			<BackgroundWrap>
				<BackgroundImage image="projects" />
			</BackgroundWrap>
			<Content>
				<animated.div style={props}>
					<ProjectSlideshow
						activeIndex={state.index}
						changing={state.changing}
						changeDuration={changeduration}
						projects={projects}
						setIndex={setIndex}
					/>
					<Navigation
						activeIndex={state.index}
						count={projects.length}
						setIndex={setIndex}
					/>
				</animated.div>
			</Content>
			<SideLinkWrap>
				<SideLink to="/" side="left">Home</SideLink>
				<SideLink to="/bio" side="right">Bio</SideLink>
			</SideLinkWrap>
		</>
	);
};

export default References;
