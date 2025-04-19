/**
 * Formats a credit card number by inserting dashes every 4 digits.
 * @param {string} cardNumber - The credit card number string to format.
 * @returns {string} Returns the formatted credit card number string.
 */
export function formatCardNumberWithDashes(cardNumber) {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
}
