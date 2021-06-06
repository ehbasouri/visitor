import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { blueGrey } from '@material-ui/core/colors';
import { HOST } from '../../../service/api';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: blueGrey[500]
  }
}));

export default function ClientItem({user}) {
  
  const classes = useStyles();

  return (
      <Link to={"clientdetail/" + user._id} >
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar src={HOST + user.avatar} className={classes.avatar} alt={user.name} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                  <React.Fragment>
                  <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                  >
                      {user.username}
                  </Typography>
                  </React.Fragment>
              }
            />
        </ListItem>
        <Divider variant="inset" />
      </Link>

  );
}
