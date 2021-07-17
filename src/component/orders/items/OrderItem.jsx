import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { blueGrey } from '@material-ui/core/colors';
import StoreIcon from '@material-ui/icons/Store';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import moment from "jalali-moment";
import { HOST } from '../../../service/api';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import {Link} from "react-router-dom";

moment.locale('fa', { useGregorianParser: true });

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: 16
  },
  avatar: {
    backgroundColor: blueGrey[500],
    borderRadius: 3
  },
}));

function OrderItem({order}) {

  const classes = useStyles();

  return (
    <Link to={"/admin/activeorderdetail/" + order._id} >
      <Card className={classes.root} >
        <CardHeader
          avatar={
            <Avatar src={HOST + order.client.avatar} aria-label="recipe" className={classes.avatar}>
              <StoreIcon/>
            </Avatar>
          }
          title={order.client.name}
          subheader={converEnglishNumToPersian(moment(order.created_at).format('YYYY/MM/DD  hh:mm  a'))}
          align={"right"}
        />
      </Card>
    </Link>
  );
}

export default SceneWrapper(OrderItem)