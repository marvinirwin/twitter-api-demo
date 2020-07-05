import axios from 'axios';

/**
 * Asks twitter for 15 tweets based on the search term q
 * @param q {string} The Search query
 * @returns {Promise<*>}
 */
export async function searchTweets(q) {
    const result = await axios.get(`${process.env.PUBLIC_URL}/search-tweets`, {params: {q, count: 10}});
    return result.data.statuses;
}


