import {render} from "@testing-library/react";
import {resolveSearchResult} from "./util";
import React from "react";
import {SavedTweet} from "../components/SavedTweet";

const tweet = resolveSearchResult("Icecream").statuses[0];

it('Renders a tweet with a functioning delete button', async () => {
    const mockRemoveSavedTweet = jest.fn();
    const {getByLabelText} = render(<SavedTweet savedTweet={tweet} removeSavedTweet={mockRemoveSavedTweet}/>);
    getByLabelText("delete").click();
    expect(mockRemoveSavedTweet).toHaveBeenCalledTimes(1)
});
