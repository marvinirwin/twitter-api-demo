import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {SavedTweet} from "./SavedTweet";


export function SavedTweetsList({savedTweets, removeSavedTweet, saveTweet}) {

    return <List style={{height: '100%'}} component="nav" onDrop={ev => {
        let data = ev.dataTransfer.getData("application/json");
        saveTweet(JSON.parse(data));
    }} onDragOver={ev => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = "move";
    }}>
        {
            savedTweets.map((savedTweet, index) => <ListItem key={index}>
                    <SavedTweet removeSavedTweet={removeSavedTweet} savedTweet={savedTweet}/>
                </ListItem>
            )
        }
    </List>
}

