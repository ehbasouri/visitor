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

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: blueGrey[500]
  }
}));

export default function ClientItem() {
  const classes = useStyles();

  return (
      <Link to={"clientdetail"} >
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar className={classes.avatar} alt="Remy Sharp" />
            </ListItemAvatar>
            <ListItemText
            primary="تنظیمات"
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                >
                    Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
            }
            />
        </ListItem>
        <Divider variant="inset" />
      </Link>

  );
}
