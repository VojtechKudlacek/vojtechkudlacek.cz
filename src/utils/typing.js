/**
 * Type text in the given element iteratively
 * @param {HTMLElement} element
 * @param {string} text
 * @param {number} ms delay between iterations
 * @returns {Promise<void>}
 */
export function typeText(element, text, ms) {
	return new Promise((resolve) => {
		let str = element.innerText;
		const intervalId = setInterval(() => {
			str = text.substring(0, str.length + 1);
			element.innerText = str;
			if (str.length === text.length) {
				clearInterval(intervalId);
				resolve();
			}
		}, ms);
	});
}

/**
 * Untype text in the given element iteratively
 * @param {HTMLElement} element
 * @param {number} ms delay between iterations
 * @returns {Promise<void>}
 */
export function untypeText(element, ms) {
	return new Promise((resolve) => {
		let str = element.innerText;
		const intervalId = setInterval(() => {
			str = str.substring(0, str.length - 1);
			element.innerText = str;
			if (!str.length) {
				clearInterval(intervalId);
				resolve();
			}
		}, ms);
	});
}

/**
 * Vanish everything besides given text
 * @param {HTMLElement} element
 * @param {string} keep Text to keep
 * @param {boolean} lock Lock element to its content position
 * @param {number?} ms Transition time
 * @returns {Promise<void>}
 */
export function vanishRest(element, keep, ms = 500) {
	/** @param {string} content */
	const replaceSpaces = (content) => content.replace(/\ /g, '&nbsp;');
	/** @param {string} content * @param {string} cname */
	const createSpan = (content, cname = 'transition') => content && `<span class="${cname}">${replaceSpaces(content)}</span>`;

	return new Promise((resolve) => {
		const baseText = element.innerText;
		if (!baseText.includes(keep)) {
			return resolve();
		}
		const keepIndex = baseText.indexOf(keep);
		const beforePart = baseText.substring(0, keepIndex);
		const afterPart = baseText.substring(keepIndex + keep.length, baseText.length);
		element.innerHTML = `${createSpan(beforePart)}${createSpan(keep, 'keep')}${createSpan(afterPart)}`;
		setTimeout(() => {
			// Little bit of a DOM hack
			element.querySelectorAll('span.transition').forEach((span) => span.classList.add('invisible'));
		}, 1);
		setTimeout(() => {
			const { left, top } = element.querySelector('.keep').getBoundingClientRect();
			element.classList.add('absolute');
			element.style.left = `${left}px`;
			element.style.top = `${top}px`;
			element.innerHTML = keep;
			resolve();
		}, ms + 1);
	});
}
