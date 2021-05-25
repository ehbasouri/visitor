import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        textAlign: "left"
    }
  }));

export default function ReadOnlyCatItem({icon, category, onClick}) {
    const classes = useStyles();

    function onItemClick() {
        onClick();
    }

    return (
        <div>
            <ListItem
                button
                alignItems={"center"}
                >
                <ListItemText onClick={onItemClick} className={classes.text} primary={category.name} />
                <ListItemIcon onClick={onItemClick} >
                    {!category.edge && icon}
                </ListItemIcon>
            </ListItem>
        </div>
    );
}
