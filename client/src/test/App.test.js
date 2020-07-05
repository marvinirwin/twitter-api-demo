import React from 'react';
import {fireEvent, render, screen, wait} from '@testing-library/react';
import App, {SAVED_TWEETS_LOCALSTORAGE_KEY} from '../App';
import {resolveSearchResult} from "./util";
import axios from "axios";
import {LocalStorageMock} from "@react-mock/localstorage/dist";

jest.mock('axios')
axios.get.mockImplementation((url, {params: {q}}) => {
    return Promise.resolve({data: resolveSearchResult(q)});
});

const query1 = 'Star Wars';
const query2 = 'Icecream';
const query1Results = resolveSearchResult(query1).statuses;
const query2Results = resolveSearchResult(query2).statuses;

it('Searches for tweets and displays them', async () => {
    const {getByTestId} = render(<App/>);
    const searchElement = getByTestId("search");
    fireEvent.change(searchElement, {target: {value: query1}})
    fireEvent.change(searchElement, {target: {value: query2}})
    const targetTweet = query2Results[0];
    await wait(() => screen.getByText(targetTweet.text));
    expect(screen.getByText(targetTweet.text)).toBeInTheDocument();
});
it('Loads tweets stored in localStorage on page load', async () => {
    let savedTweet = query1Results[0];
    const {getByText} = render(<LocalStorageMock
            items={{[SAVED_TWEETS_LOCALSTORAGE_KEY]: JSON.stringify([savedTweet])}}
        >
            <App/>
        </LocalStorageMock>
    );
    expect(getByText(savedTweet.text)).toBeInTheDocument();
});
