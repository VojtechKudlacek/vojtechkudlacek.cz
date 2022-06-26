/**
 * Creates hint over an element after some time
 * @param {HTMLElement} element
 * @param {number} time
 */
export function hintClick(element, time) {
	const rootElement = document.getElementById('root');
	const hintElement = document.createElement('div');
	hintElement.classList.add('hint');

	const setPosition = () => {
		const { x, y, width, height } = element.getBoundingClientRect();
		hintElement.style.left = `calc(${Math.floor(x + width / 2)}px - 1rem)`;
		hintElement.style.top = `calc(${y + height}px + 0.5rem)`;
	};

	const timeoutId = setTimeout(() => {
		setPosition();
		rootElement.append(hintElement);
	}, time);

	const clickHandler = () => {
		clearTimeout(timeoutId);
		hintElement.classList.add('transition', 'invisible');
		setTimeout(() => hintElement.remove(), 500);
		element.removeEventListener('click', clickHandler);
		window.removeEventListener('resize', setPosition);
	};

	element.addEventListener('click', clickHandler);
	window.addEventListener('resize', setPosition);
}
