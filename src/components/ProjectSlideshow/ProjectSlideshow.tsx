//? Core
import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';
//? Components
import Project from 'components/Project';

interface Properties {
	activeIndex: number;
	changing: boolean;
	changeDuration: number;
	projects: Array<Project>;
	setIndex: (index: number) => void;
}

const ProjectSlideShow: FunctionComponent<Properties> = ({ changing, activeIndex, projects, setIndex }) => {
	const props = useSpring({ opacity: changing ? 0 : 1 });
	const prev = () => {
		if (changing) {
			return;
		}
		if (activeIndex - 1 < 0) {
			setIndex(projects.length - 1);
		} else {
			setIndex(activeIndex - 1);
		}
	};
	const next = () => {
		if (changing) {
			return;
		}
		if (activeIndex + 1 >= projects.length) {
			setIndex(0);
		} else {
			setIndex(activeIndex + 1);
		}
	};
	return (
		<div className="projectSlideshow">
			<div className="control" onClick={prev}>{'<'}</div>
			<animated.div style={props}>
				<Project project={projects[activeIndex]} />
			</animated.div>
			<div className="control" onClick={next}>{'>'}</div>
		</div>
	);
};

export default ProjectSlideShow;
