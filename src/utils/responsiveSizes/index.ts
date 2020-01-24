export const getHomeTitleSize = (): number => {
	const windowWidth = window.innerWidth;
	if (windowWidth <= 575) {
		return windowWidth - 40;
	} else if (windowWidth <= 767) {
		return windowWidth - 60;
	} else if (windowWidth <= 991) {
		return windowWidth - 200;
	}
	return Math.floor(windowWidth / 2);
};

export const getBioPadding = (): number => {
	if (window.innerWidth >= 1200) {
		return Math.floor(window.innerWidth / 10);
	}
	return 0;
};

export const getBioWidth = (requiredWidth: number): number => {
	if (window.innerWidth <= 767) {
		return window.innerWidth - 60;
	} else if (window.innerWidth <= 991) {
		return window.innerWidth - 100;
	}
	return requiredWidth;
};

export const getTitleImage = (): string => {
	if (window.innerWidth <= 575) {
		return 'vkmobile.svg';
	}
	return 'vk.svg';
};
