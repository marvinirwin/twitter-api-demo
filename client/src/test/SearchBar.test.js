import React from "react";
import {fireEvent, render, screen, wait} from '@testing-library/react';
import {SearchBar} from "../components/SearchBar";

it('Renders a search field which emits events when changed', async () => {
    const mockOnSearchTermChanged = jest.fn();
    const { getByTestId} = render(<SearchBar onSearchTermChanged={mockOnSearchTermChanged}/>);
    const searchElement = getByTestId("search");
    fireEvent.change(searchElement, { target: { value: "A query" } });
    fireEvent.change(searchElement, { target: { value: "Another query" } });
    expect(mockOnSearchTermChanged).toHaveBeenCalledTimes(2);
});
