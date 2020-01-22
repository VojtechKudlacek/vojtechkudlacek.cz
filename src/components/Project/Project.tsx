//? Core
import React, { FunctionComponent } from 'react';

interface Properties {
	project: Project;
}

const Project: FunctionComponent<Properties> = ({ project }) => {
	return (
		<div className="project">
			<div className="projectName">{project.name}</div>
			<div className="projectDescription">{project.description}</div>
			<div className="projectLink">
				{project.link && (<a href={project.link} target="__blank">Visit Project</a>)}
			</div>
		</div>
	);
};

export default Project;
