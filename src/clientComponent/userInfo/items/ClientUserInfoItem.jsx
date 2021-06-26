import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export function ClientUserInfoItem({
    title,
    value
}) {
  const classes = useStyles();

  return (
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
                {value}
            </React.Fragment>
          }
        />
      </ListItem>
  );
}
