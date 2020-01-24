//? Core
import React, { FunctionComponent } from 'react';
//? Utils
import useControl from 'hooks/projectControlHook';
import projects from 'utils/projectList';
//? Components
import Navigation from 'components/Navigation';
import SideLink from 'components/SideLink';
import SideLinkWrap from 'components/SideLinkWrap';
import Content from 'components/Content';
import BackgroundWrap from 'components/BackgroundWrap';
import ProjectSlideshow from 'components/ProjectSlideshow';
import BackgroundImage from 'components/BackgroundImage';

const References: FunctionComponent = () => {
	const changeduration = 400;
	const [state, setIndex] = useControl(changeduration);
	return (
		<>
			<BackgroundWrap>
				<BackgroundImage image="projects" />
			</BackgroundWrap>
			<Content>
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
			</Content>
			<SideLinkWrap>
				<SideLink to="/" side="left">Home</SideLink>
				<SideLink to="/bio" side="right">Bio</SideLink>
			</SideLinkWrap>
		</>
	);
};

export default References;
