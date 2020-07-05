import {searchTweets} from "../lib/SearchTweets";
import {resolveSearchResult} from "./util";
import axios from "axios";

jest.mock('axios')
axios.get.mockImplementation((url, {params: {q}}) => {
    return Promise.resolve({data: resolveSearchResult(q)});
});

const searchTerm1 = "Star Wars";
const searchTerm2 = "Icecream"

/**
 * Checks that results are returned, that changing the search term changes the results,
 * and that the same query returns the same results.
 * This wouldn't work if I was not memoizing server side,
 * but it's a nice enough guarantee that my search terms are being sent and affect the output
 */
it("Can query tweets by search term", async () => {
    await searchTweets(searchTerm1);
    const firstQueryRepeated = await searchTweets(searchTerm1);
    expect(firstQueryRepeated.length).toBeGreaterThan(1);
    const r2 = await searchTweets(searchTerm2);
    expect(r2.length).toBeGreaterThan(1);
    expect(firstQueryRepeated).not.toEqual(r2);
    expect(firstQueryRepeated[0]).toHaveProperty('text')
    expect(firstQueryRepeated[0]).toHaveProperty('text')
});
/**
 * Checks that search results are the expected shape
 */
it('Receives objects which are the expected shape', async () => {
    const r1 = await searchTweets(searchTerm1);
    const receivedTweet = r1[0];
    expect(receivedTweet).toHaveProperty('text');
})
