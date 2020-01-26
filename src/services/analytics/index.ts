//? Core
import googleAnalytics from 'react-ga';
//? Services
import history from 'services/history';

const trackingID = 'UA-157005017-1';

export const startAnalyzing = (): void => {
	googleAnalytics.initialize(trackingID);
	history.listen((location) => {
		googleAnalytics.set({ page: location.pathname });
		googleAnalytics.pageview(location.pathname);
	});
};
