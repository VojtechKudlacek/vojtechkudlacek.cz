import googleAnalytics from 'react-ga';

// You can steal this, but It will be useless for you anyway... :)
const trackingID = 'UA-157005017-1';

export const initAnalytics = (): void => {
	googleAnalytics.initialize(trackingID);
};
