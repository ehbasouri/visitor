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
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import numberWithCommas from '../../../utils/commaSeperator';
import fa from '../../../translation/fa';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: blueGrey[500]
  }
}));

export default function ClientDebtItem({debt}) {
  
  const classes = useStyles();

  return (
      <Link to={`/debtdetailes/${debt.business.name}/${debt.business._id}`} > 
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar src={HOST + debt.business.avatar} className={classes.avatar} alt={debt.business.name} />
            </ListItemAvatar>
            <ListItemText
              primary={debt.business.name}
              secondary={
                  <React.Fragment>
                  <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                  >
                    {converEnglishNumToPersian(numberWithCommas(debt.amount - debt.paied_amount)) + " " + fa["toman"]}
                  </Typography>
                  </React.Fragment>
              }
            />
        </ListItem>
        <Divider variant="inset" />
      </Link>

  );
}
