import {render} from "@testing-library/react";
import {resolveSearchResult} from "./util";
import React from "react";
import {SavedTweetsList} from "../components/SavedTweetList";

const tweets = resolveSearchResult("Icecream").statuses;

it('Renders a list of tweets with clickable delete icons', async () => {
    const mockRemoveSavedTweet = jest.fn();
    const { getAllByLabelText} = render(<SavedTweetsList savedTweets={tweets} removeSavedTweet={mockRemoveSavedTweet}/>);
    getAllByLabelText("delete").forEach(button => button.click());
    expect(mockRemoveSavedTweet).toHaveBeenCalledTimes(tweets.length);
});
