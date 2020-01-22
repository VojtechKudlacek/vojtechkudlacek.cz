//? Core
import React, { FunctionComponent, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
//? Services
import imagePreloader from 'services/imagePreloader';

const Preloader: FunctionComponent = ({ children }) => {
	const [loaded, updateLoadedCount] = useState<number>(0);
	const [hideLoading, setHideState] = useState<boolean>(false);
	const props = useSpring({ opacity: loaded >= imagePreloader.requiredToLoad ? 0 : 1, config: { duration: 500 } });
	useEffect(() => {
		imagePreloader.load(updateLoadedCount);
	}, []);
	if (loaded >= imagePreloader.requiredToLoad && !hideLoading) {
		setTimeout(() => setHideState(true), 500);
	}
	if (!hideLoading) {
		const progress = loaded * 100 / imagePreloader.requiredToLoad;
		return (
			<animated.div style={props} className="loading">
				<span>Loading</span>
				<div className="loadingBar" style={{ width: `${progress}%` }} />
			</animated.div>
		);
	}
	// For some reason `return children` does not work. What's the problem React...
	return <>{children}</>;
};

export default Preloader;
