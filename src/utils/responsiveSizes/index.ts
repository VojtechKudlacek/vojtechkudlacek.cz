export const getHomeTitleSize = () => {
	const windowWidth = window.innerWidth;
	if (windowWidth < 767) {
		return windowWidth - 100;
	} else if (windowWidth < 991) {
		return windowWidth - 200;
	} else if (windowWidth < 1199) {
		return Math.floor((window.innerWidth / 2) - 100);
	}
	return Math.floor((window.innerWidth / 2) - 200);
};
