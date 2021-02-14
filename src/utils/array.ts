import { randomIntFromInterval } from 'utils/number';

export const randomItemFromArray = <T>(src: Array<T>): T => {
	return src[randomIntFromInterval(0, src.length - 1)];
};
