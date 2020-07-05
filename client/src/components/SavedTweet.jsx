import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import Tweet from "./Tweet";

export function SavedTweet({savedTweet, removeSavedTweet}) {
    return <ListItem alignItems="flex-start" class="savedtweet">
        <Tweet tweet={savedTweet}/>
        <ListItemSecondaryAction>
            <IconButton aria-label="delete" edge="end" onClick={() => removeSavedTweet(savedTweet)}>
                <DeleteIcon/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>;
}