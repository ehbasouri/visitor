import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from "react-router-dom";
import { blueGrey } from '@material-ui/core/colors';
import { HOST } from '../../../service/api';
import moment from "jalali-moment";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import numberWithCommas from '../../../utils/commaSeperator';
import fa from '../../../translation/fa';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

moment.locale('fa', { useGregorianParser: true });

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  avatar: {
    backgroundColor: blueGrey[500], 
    borderRadius: 3
  },
  canceledIcon: {
    color: "red"
  },
  doneIcon: {
    color: "green"
  }
}));

export default function DebtItem({debt, client_name}) {
  
  const classes = useStyles();

  const history = useHistory();

  const onClick = () => {
    if(debt.order_id){
      history.push("/admin/archiveorderdetail/" + debt.order_id)
    }
  }

  return (
      // <Link to={"/admin/archiveorderdetail/" + debt.order_id} >
      <div onClick={onClick}  >
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                {debt.is_debt ? 
                  <IndeterminateCheckBoxIcon className={classes.canceledIcon} /> :
                  <AddBoxIcon className={classes.doneIcon} />
                }
            </ListItemAvatar>
            <ListItemText
              primary={converEnglishNumToPersian(numberWithCommas(debt.amount)) + " " + fa["toman"] }
              secondary={
                  <React.Fragment>
                  <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                  >
                      {converEnglishNumToPersian(moment(debt.created_at).format('YYYY/MM/DD  hh:mm  a'))}
                  </Typography>
                  </React.Fragment>
              }
            />
        </ListItem>
        <Divider />
      </div>
      // </Link>

  );
}
