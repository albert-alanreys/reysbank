const SITE_NAME = 'ReysBank';

/**
 * Generates a formatted title string for the website.
 *
 * @param {string} title - The specific title to include in the formatted string. If not provided, only the site name will be returned.
 * @returns {string} The formatted title string in the format "title | SITE_NAME" or just "SITE_NAME" if no title is provided.
 */
export const getTitle = (title) => {
	return title ? `${title} | ${SITE_NAME}` : SITE_NAME;
};
