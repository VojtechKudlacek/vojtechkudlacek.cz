import './styles/style.css';
import './styles/interactive.css';
import steps from './steps';

const run = async () => {
	for (const value of steps()) {
		if (value instanceof Promise) {
			await value
		}
	}
};

run();
