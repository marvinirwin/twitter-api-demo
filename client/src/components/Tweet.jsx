import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import React, {Fragment} from "react";

function getTweetTitle(str) {
    return str.substr(0, 10);
}

export default function Tweet({tweet}) {
    return <Fragment>
        <ListItemAvatar>
            <Avatar alt={tweet.user.name} src={tweet.user.profile_image_url} />
        </ListItemAvatar>
        <ListItemText
            primary={getTweetTitle(tweet.text)}
            secondary={
                <Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                    >
                        {tweet.user.name}
                    </Typography>
                    {tweet.text}
                </Fragment>
            }
        />
    </Fragment>
}
