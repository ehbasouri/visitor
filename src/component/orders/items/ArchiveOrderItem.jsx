import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
    alignItems: "center",
  },
  count: {
      color: "#2e7d32",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  divider: {
      height: "3px",
      backgroundColor: "#666"
  }
}));

export default function ArchiveOrderItem({title, value, cssId}) {
  const classes = useStyles();
  return (
    <List dense className={classes.root}>
          <ListItem button>
            <ListItemText id={cssId} disableTypography primary={title} />

            <ListItemSecondaryAction>
                <ListItemText id={cssId} disableTypography className={classes.count} primary={value } />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider className={classes.divider} />
    </List>
  );
}
