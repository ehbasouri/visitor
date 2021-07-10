import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { HOST } from '../../../service/api';
import { AddProductToBasketButton } from '../../../common/AddProductToBasketButton';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import numberWithCommas from '../../../utils/commaSeperator';
import fa from '../../../translation/fa';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: "16px",
    justifyContent: "space-between"
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function BasketItem({product}) {
  const classes = useStyles();

  const business = useSelector(state=>state.general_reducer.business)
  const cbrs = useSelector(state=>state.general_reducer.cbrs)

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography align={"left"} component="h6" variant="h5">
            {product.name}
          </Typography>
          <Typography align={"left"} variant="subtitle1" color="textSecondary">
            {product.description}
          </Typography>
          {cbrs[business._id] && cbrs[business._id].show_price && <Typography align={"left"} variant="body2" color="textSecondary" component="p">
            {converEnglishNumToPersian(numberWithCommas(product.price * product.countInBasket))} {fa["toman"]}
          </Typography>}
        </CardContent>
        <AddProductToBasketButton product={product} />
      </div>
      <CardMedia
        className={classes.cover}
        image={HOST + product.image}
        title="Live from space album cover"
      />
    </Card>
  );
}
