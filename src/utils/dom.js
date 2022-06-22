/**
 * @typedef {{
 * 	add: (...cnames: Array<string>) => ClassesActions;
 * 	remove: (...cnames: Array<string>) => ClassesActions;
 * }} ClassesActions
 */

/**
 * Creates a html class manager
 * @param {HTMLElement} element
 * @returns {ClassesActions}
 */
export function classes(element) {
	/** @type {ClassesActions} */
	const actions = {
		add: (...cnames) => {
			element.classList.add(...cnames);
			return actions;
		},
		remove: (...cnames) => {
			element.classList.remove(...cnames);
			return actions;
		}
	}
	return actions;
}

/**
 * Promise awaiting for clicking on the given element
 * @param {HTMLElement} element
 * @param {boolean?} addCursor Set to `true` if you want to add pointer cursor
 * @returns {Promise<void>}
 */
export function waitForClick(element, addCursor) {
	return new Promise((resolve) => {
		const listener = () => {
			element.removeEventListener('click', listener);
			if (addCursor) { classes(element).remove('clickable'); }
			resolve();
		};
		element.addEventListener('click', listener);
		if (addCursor) { classes(element).add('clickable'); }
	});
}

/**
 * Absolutely centers the element on the screen
 * @param {HTMLElement} element
 * @returns {void}
 */
export function centerOnScreen(element) {
	const { width, height } = element.getBoundingClientRect();
	element.style.left = `${Math.floor(window.innerWidth / 2 - width / 2)}px`;
	element.style.top = `${Math.floor(window.innerHeight / 2 - height / 2)}px`;
}

/**
 * Absolutely locks the element to its position
 * @param {HTMLElement} element
 * @returns {void}
 */
export function lockToPlace(element) {
	const { left, top } = element.getBoundingClientRect();
	element.style.left = `${left}px`;
	element.style.top = `${top}px`;
	classes(element).add('absolute');
}

/**
 * Unlocks the absolutely positioned element
 * @param {HTMLElement} element
 */
export function unlock(element) {
	element.removeAttribute('style');
	element.classList.remove('absolute');
}
