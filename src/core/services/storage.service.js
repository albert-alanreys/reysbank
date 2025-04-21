/**
 * A utility class for interacting with the browser's localStorage API.
 */
export class StorageService {
	/**
	 * Retrieves an item from localStorage by the provided key.
	 *
	 * @param {string} key - The key of the item to retrieve.
	 * @returns {any} The parsed value of the item, or `null` if the item doesn't exist.
	 */
	getItem(key) {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	}

	/**
	 * Saves an item in localStorage with the provided key and value.
	 *
	 * @param {string} key - The key under which the value will be stored.
	 * @param {any} value - The value to store. It will be serialized to a JSON string.
	 */
	setItem(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	/**
	 * Removes an item from localStorage by the provided key.
	 *
	 * @param {string} key - The key of the item to remove.
	 */
	removeItem(key) {
		localStorage.removeItem(key);
	}

	/**
	 * Clears all data from localStorage.
	 */
	clear() {
		localStorage.clear();
	}
}
