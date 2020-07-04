const {memoFunction} = require('./memo');
const Twitter = require('twitter-lite');

async function initializeTwitterClient() {
    const twitterKey = process.env["TWITTER_API_KEY"];
    const twitterSecret = process.env["TWITTER_API_KEY_SECRET"];
    const user = new Twitter({
        consumer_key: twitterKey,
        consumer_secret: twitterSecret,
    });
    const response = await user.getBearerToken();
    return new Twitter({
        bearer_token: response.access_token,
        consumer_key: twitterKey,
        consumer_secret: twitterSecret,
    });
}

/**
 * @type {Promise<Twitter>}
 */
const twitterClient = initializeTwitterClient();


module.exports = {
    memoizedSearchTweets: memoFunction("TWEET_SEARCH_RESULTS", async ({q, count}) => {
        return await (await twitterClient).get("search/tweets", {
            q,
            count
        });
    })
}