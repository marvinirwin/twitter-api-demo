import {render} from "@testing-library/react";
import {resolveSearchResult} from "./util";
import React from "react";
import {SearchResultList} from "../components/SearchResultList";

const tweets = resolveSearchResult("Icecream").statuses;

it('Renders a list of tweets with clickable save icons', async () => {
    const mockSaveTweet = jest.fn();
    const { getAllByLabelText} = render(<SearchResultList searchResults={tweets} saveTweet={mockSaveTweet}/>);
    getAllByLabelText("save").forEach(button => button.click());
    expect(mockSaveTweet).toHaveBeenCalledTimes(tweets.length);
});
