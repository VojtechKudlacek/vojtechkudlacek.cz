//? Core
import React, { FunctionComponent } from 'react';

interface Properties {
	image: 'home' | 'bio' | 'projects';
}

const BackgroundImage: FunctionComponent<Properties> = ({ image }) => {
	return <div className={`backgroundImage ${image}`} />;
};

export default BackgroundImage;
