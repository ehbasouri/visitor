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

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={HOST + "8bbb0a53ab33342af0f83199f6b843bc"}
        />
        <CardContent>
          <Typography align={"left"} gutterBottom variant="h5" component="h2">
            {fa["date"]}
          </Typography>
          <Typography align={"left"} variant="body2" color="textSecondary" component="p">
            {moment(date).format('YYYY/MM/DD  hh:mm  a')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
