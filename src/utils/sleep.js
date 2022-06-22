/**
 * Creates a Promise that resolves after given time
 * @param {number} ms time in miliseconds
 * @returns {Promise<void>}
 */
export default function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
