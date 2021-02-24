export const randomIntFromInterval = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomNegation = (num: number): number => {
	return Math.random() < 0.5 ? -num : num;
};

export const toNDecimals = (num: number, decimals = 1): number => {
	const helper = 10 ** decimals;
	return Math.round(num * helper) / helper;
};

export const getDocumentHeight = (): number => {
	const body = document.body;
	const html = document.documentElement;
	return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
};

export const power = (num: number): number => {
	return num * num;
};
