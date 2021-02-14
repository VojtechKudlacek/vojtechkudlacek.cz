export const randomIntFromInterval = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomFloatFromInterval = (min: number, max: number) => {
	return randomIntFromInterval(min * 10, max * 10) / 10;
};

export const getDocumentHeight = (): number => {
	const body = document.body;
	const html = document.documentElement;
	return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
};

export const power = (num: number): number => {
	return num * num;
};
