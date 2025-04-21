import { SERVER_URL } from '@/config/url.config';

/**
 * @module rfetch
 * @description
 * `rfetch` is a minimalistic library for handling API requests. It provides functionality for making HTTP requests and handling errors.
 */

/**
 * Extracts the error message from an error object.
 *
 * @param {Object} error - The error object containing the message.
 * @param {string | Object} error.message - The message property of the error, which can be a string or an object.
 * @returns {string} The extracted error message.
 */
export function extractErrorMessage(error) {
	return typeof error.message === 'object' ? error.message[0] : error.message;
}

/**
 * Fetch data from the API with provided options.
 *
 * @param {Object} options - Configuration options for the API request.
 * @param {string} options.path - The API endpoint path (relative to the base URL).
 * @param {('GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT')} [options.method='GET'] - The HTTP method to use for the request.
 * @param {Object} [options.body=null] - The request payload to send as JSON.
 * @param {Object} [options.headers={}] - Optional headers to include with the request.
 * @param {Function} [options.onSuccess=null] - Callback function to handle a successful response. Receives the response data as an argument.
 * @param {Function} [options.onError=null] - Callback function to handle an error response. Receives the error message as an argument.
 * @returns {Promise<{isLoading: boolean, error: string | null, data: any | null}>} A promise resolving to an object containing:
 * - `isLoading`: Indicates whether the request is still in progress.
 * - `error`: The error message, if any occurred during the request.
 * - `data`: The response data, if the request was successful.
 */
export async function rfetch({
	path,
	method = 'GET',
	body = null,
	headers = {},
	onSuccess = null,
	onError = null,
}) {
	let isLoading = true;
	let error = null;
	let data = null;

	const url = `${SERVER_URL}/api${path}`;
	const accessToken = '';
	const requestOptions = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
	};

	if (accessToken) {
		requestOptions.headers.Authorization = `Bearer ${accessToken}`;
	}

	if (body) {
		requestOptions.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(url, requestOptions);

		if (response.ok) {
			data = await response.json();

			if (onSuccess) onSuccess(data);
		} else {
			error = await response.json();
			const errorMessage = extractErrorMessage(error);

			if (onError) onError(errorMessage);
		}
	} catch (error) {
		const errorMessage = extractErrorMessage(error);

		if (errorMessage) onError(errorMessage);
	} finally {
		isLoading = false;
	}

	return { isLoading, error, data };
}
