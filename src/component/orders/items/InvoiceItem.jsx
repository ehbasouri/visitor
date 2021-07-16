import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import fa from '../../../translation/fa';
import { Divider } from '@material-ui/core';
import numberWithCommas from '../../../utils/commaSeperator';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';

import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  count: {
  },
  value: {
    color: "#bf360c",
    textAlign: "right"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  divider: {
      color: "red",
      backgroundColor: "#666",
      height: "3px"
  },
  title: {
      color: "#666"
  },
  price: {
      color: "#009688"
  }
}));

const InvoiceContentItem = ({
  cssId,
  value,
  title
}) =>{
  const classes = useStyles();

  return (
    <>
    <ListItem className={classes.container} button>
        <ListItemText id={cssId} disableTypography className={classes.count} primary={ title } />
      {/* <ListItemSecondaryAction> */}
          <ListItemText id={cssId} disableTypography className={classes.value} primary={ value } />
      {/* </ListItemSecondaryAction> */}
    </ListItem>
    <Divider/>
    </>
  )
}

export default function InvoiceIrem({product, cssId = "", gift = false}) {
  const classes = useStyles();

  const price = product.unitCountInBasket === undefined ?
   (product.countInBasket * product.price) :
   (product.countInBasket * product.price) + ( product.unitCountInBasket * product.unit_price)

  return (
    <div >
      <List dense className={classes.root}>
            <ListItem className={classes.container} button>
              <ListItemText id={cssId} disableTypography primary={product.name} />

                {gift && <CardGiftcardIcon/>}
            </ListItem>
            {product.countInBasket > 0 && <InvoiceContentItem
              cssId={cssId}
              title={fa["box"]}
              value={converEnglishNumToPersian(product.countInBasket) + " " + fa["number"]}
            />}
            {product.unitCountInBasket > 0 && <InvoiceContentItem
              cssId={cssId}
              title={fa["unit"]}
              value={converEnglishNumToPersian(product.unitCountInBasket) + " " + fa["number"] }
            />}
            {product.countInBasket > 0 && !gift && <InvoiceContentItem
              cssId={cssId}
              title={fa["Unit price"]}
              value={converEnglishNumToPersian(numberWithCommas(product.price)) + " " + fa["toman"] }
            />}
            {product.unitCountInBasket > 0 && !gift && <InvoiceContentItem
              cssId={cssId}
              title={fa["unit_price"]}
              value={converEnglishNumToPersian(numberWithCommas(product.unit_price)) + " " + fa["toman"] }
            />}
            {!gift && <InvoiceContentItem
              cssId={cssId}
              title={fa["price"]}
              value={ converEnglishNumToPersian(numberWithCommas(price)) + " " + fa["toman"] }
            />}
            <Divider className={classes.divider} />
      </List>
    </div>
  );
}
