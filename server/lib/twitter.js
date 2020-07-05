const {memoFunction} = require('./memo');
const Twit = require('twit')

const twitterKey = process.env["TWITTER_API_KEY"];
const twitterSecret = process.env["TWITTER_API_KEY_SECRET"];

const twitterClient = new Twit({
    consumer_key: twitterKey,
    consumer_secret: twitterSecret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
    app_only_auth: true
});

module.exports = {
    memoizedSearchTweets: memoFunction("TWEET_SEARCH_RESULTS",
        async ({q, count}) => {
            const result =  await twitterClient.get("search/tweets", {
                q,
                count
            });
            return result.data;
        })
}