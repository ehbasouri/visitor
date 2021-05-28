import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  count: {
      color: "#00b0ff"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));

export default function OrderInfoItem({title, value}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  return (
    <List dense className={classes.root}>
          <ListItem button>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
                <ListItemText className={classes.count} primary={value} />
            </ListItemSecondaryAction>
          </ListItem>
    </List>
  );
}
