import AppBar from "@material-ui/core/AppBar";
import React from "react";
import {Toolbar} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export function SearchBar({onSearchTermChanged}) {
    return <AppBar position="relative">
        <Toolbar>
            <TextField
                label="Search"
                color="secondary"
                inputProps={{ "data-testid": "search" }}
                onChange={e => onSearchTermChanged(e.target.value)}
            />
        </Toolbar>
    </AppBar>
}