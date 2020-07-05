const express = require('express');
const {memoizedSearchTweets} = require('../lib/twitter');
const utf8 = require('utf8');

/**
 * In the pdf I received it says the limit is 1000 utf8 encoded characters.
 * Currently (2020-07-03), twitter docs say:
 *   "A UTF-8, URL-encoded search query of 500 characters maximum,
 * including operators. Queries may additionally be limited by complexity."
 */
const TWITTER_SEARCH_TERM_LENGTH_LIMIT = 500;

const router = express.Router();

function between(n, min, max) {
    return n >= min && n <= max;
}

router.get('/search-tweets', async function (req, res, next) {
    const q = req.query.q;
    const count = req.query.count;

    if (typeof q !== 'string') {
        res.status(400);
        res.send(`"q" must be a valid string`);
        return;
    }

    const encoded = utf8.encode(q);
    if (encoded.length > TWITTER_SEARCH_TERM_LENGTH_LIMIT) {
        res.status(400);
        res.send(`Search term must be at most ${TWITTER_SEARCH_TERM_LENGTH_LIMIT} utf8 characters long`)
        return;
    }

    if (count) {
        /**
         * https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
         * "The number of tweets to return per page, up to a maximum of 100.  Defaults to 15"
         */
        if (!/^\d+$/.exec(count) || !between(parseInt(count, 10), 1, 100)) {
            res.status(400);
            res.send(`A count was provided, but it was not a valid integer between 1 and 100 ${count}`);
            return;
        }
    }

    res.status(200);
     // TODO inline
    res.json(await memoizedSearchTweets({q: encoded, count}));
});

module.exports = router;
