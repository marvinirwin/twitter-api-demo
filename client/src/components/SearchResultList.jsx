import List from "@material-ui/core/List";
import React from "react";
import {SearchResult} from "./SearchResult";

export function SearchResultList({searchResults, saveTweet}) {
    return <List style={{height: "100%"}}>
        {searchResults
            .map((searchResult, index) => <SearchResult saveTweet={saveTweet} searchResult={searchResult} key={index}/>
            )}
    </List>;
}

