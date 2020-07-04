const fs = require('fs-extra');

module.exports = {
    /**
     * Memoizes a function in a key/value store where the keys
     * are JSON.stringify(params) and values are JSON.stringify(result).
     * Writes every time the memo is updated, and thus scales horribly,
     * but good for limiting repetitive API calls while developing
     * Using this means results are stale after the first search
     * @param memoFilename
     * @param func
     * @returns {function(...[*]=): *}
     */
    memoFunction: function (memoFilename, func) {
        const memoFilePath = `${memoFilename}.json`;
        const filedata = fs.pathExistsSync(memoFilePath) && fs.readJsonSync(memoFilePath);
        const memo = filedata || {};
        return async function (...args) {
            const key = JSON.stringify(args);
            if (!memo[key]) {
                memo[key] = await func(...args);
                await fs.writeJson(memoFilePath, memo);
            }
            return memo[key];
        };
    }
}