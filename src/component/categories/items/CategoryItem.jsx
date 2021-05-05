import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        textAlign: "left"
    }
  }));

export default function CategoryItem({icon}) {
    const classes = useStyles();

    return (
        <ListItem
            button
            // onClick={(event) => handleListItemClick(event, 0)}
            alignItems={"center"}
            >
            <ListItemText className={classes.text} primary="سلام" />
            <ListItemIcon>
                {icon}
            </ListItemIcon>
        </ListItem>
    );
}
