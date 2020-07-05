const {expect} = require("@jest/globals");

const fs = require('fs-extra');
const request = require("supertest");

const tweetMemoFilename = "TWEET_SEARCH_RESULTS.json";

fs.pathExistsSync(tweetMemoFilename) && fs.removeSync(tweetMemoFilename);

const app = require('../app');

describe("GET /tweets", () => {
    let q = "Star Wars";
    it("Should return 400 if the query is not provided", async () => {
        await request(app).get("/search-tweets")
            .expect(400);
    });
    it("Should return 400 if the query is too long", async () => {
        await request(app).get("/search-tweets")
            .query({q: "x".repeat(1001)})
            .expect(400);
    });
    it("Should return 400 if the count is not an integer", async () => {
        await request(app).get("/search-tweets")
            .query({q, count: 'abc123'})
            .expect(400);
    });
    it("Should return 400 if the count is not between 1 or 100", async () => {
        await request(app).get("/search-tweets")
            .query({q, count: 101})
            .expect(400);
        await request(app).get("/search-tweets")
            .query({q, count: -1})
            .expect(400);
    });
    it("Should return a result if the query is just right", async () => {
        await request(app).get("/search-tweets")
            .query({q: "Icecream"})
            .expect(200);
    });
    it("Should add to the memo if a new query appears", async () => {
        const oldMemo = Object.keys(await fs.readJson(tweetMemoFilename));
        await request(app).get("/search-tweets")
            .query({q})
            .expect(200);
        const newMemo = Object.keys(await fs.readJson(tweetMemoFilename));
        expect(newMemo).toHaveLength(oldMemo.length + 1);
    });
    it("Should not add to the memo if a query is repeated", async () => {
        const oldMemo = Object.keys(await fs.readJson(tweetMemoFilename));
        await request(app).get("/search-tweets")
            .query({q})
            .expect(200);
        const newMemo = Object.keys(await fs.readJson(tweetMemoFilename));
        expect(newMemo).toHaveLength(oldMemo.length);
    });
    it("Should return use the count query parameter to restrict results", async () => {
        // This test would technically fail silently if the API returned 1 result by default and ignored count
        // But handling that is beyond the scope of these integration tests
        let count = 1;
        await request(app).get("/search-tweets")
            .query({q, count: count})
            .expect(function (res) {
                if (!(res.body.statuses.length === count)) {
                    throw new Error(`Results did not have length ${count}`);
                }
            });
    });
    it("Should return results of the correct shape", async () => {
        // This test would technically fail silently if the API returned 1 result by default and ignored count
        // But handling that is beyond the scope of these integration tests
        let count = 1;
        await request(app).get("/search-tweets")
            .query({q, count: count})
            .expect(function (res) {
                let statuses = res.body.statuses;
                expect(statuses).toBeDefined();
                expect(statuses.length).toBeGreaterThan(0);
                expect(statuses).toHaveProperty('0.text')
            });
    });
});

