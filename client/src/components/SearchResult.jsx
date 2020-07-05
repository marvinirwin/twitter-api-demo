import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import Tweet from "./Tweet";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export function SearchResult({saveTweet, searchResult}) {
    return <ListItem alignItems="flex-start" draggable
                     class="searchresult"
                     onDragStart={
        ev => {
            ev.dataTransfer.setData("application/json", JSON.stringify(searchResult));
            ev.dataTransfer.dropEffect = "copy";
        }
    }>
        <Tweet tweet={searchResult}/>
        <ListItemSecondaryAction>
            <IconButton aria-label="save" role="button" edge="end" onClick={() => saveTweet(searchResult)}>
                <AddIcon/>
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>;
}