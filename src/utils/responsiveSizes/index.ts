export const SIZES = {
	SMALL: 575,
	MEDIUM: 767,
	LARGE: 991,
	EXTRA_LARGE: 1199
};

export const getHomeTitleSize = (): number => {
	const windowWidth = window.innerWidth;
	if (windowWidth <= SIZES.SMALL) {
		return windowWidth - 40;
	} else if (windowWidth <= SIZES.MEDIUM) {
		return windowWidth - 60;
	} else if (windowWidth <= SIZES.LARGE) {
		return windowWidth - 200;
	}
	return Math.floor(windowWidth / 2);
};

export const getBioWidth = (requiredWidth: number): number => {
	if (window.innerWidth <= SIZES.MEDIUM) {
		return window.innerWidth - 60;
	} else if (window.innerWidth <= SIZES.LARGE) {
		return window.innerWidth - 100;
	}
	return requiredWidth;
};
