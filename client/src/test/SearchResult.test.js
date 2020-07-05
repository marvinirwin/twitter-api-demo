import {render} from "@testing-library/react";
import {resolveSearchResult} from "./util";
import React from "react";
import {SearchResult} from "../components/SearchResult";

const tweet = resolveSearchResult("Icecream").statuses[0];

it('Renders a tweet with a functioning save button', async () => {
    const mockSaveTweet = jest.fn();
    const {getByLabelText} = render(<SearchResult searchResult={tweet} saveTweet={mockSaveTweet}/>);
    getByLabelText("save").click();
    expect(mockSaveTweet).toHaveBeenCalledTimes(1)
});
