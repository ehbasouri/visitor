import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { HOST } from '../../../service/api';
import fa from '../../../translation/fa';
import moment from "jalali-moment";
import { useSelector } from "react-redux";
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';

moment.locale('fa', { useGregorianParser: true });

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 140,
    width: 140
  },
});

export default function SignItem({date}) {
  const classes = useStyles();

  const user_info = useSelector(state=>state.general_reducer.user_info)

  return (
    <div className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={HOST + user_info.sign_url}
        />
        <CardContent>
          <Typography align={"left"} gutterBottom variant="h4" component="h2">
            {fa["date"]}
          </Typography>
          <Typography align={"left"} variant="h5" component="p">
            {converEnglishNumToPersian(moment(date).format('YYYY/MM/DD  hh:mm  a'))}
          </Typography>
        </CardContent>
      </CardActionArea>
    </div>
  );
}
