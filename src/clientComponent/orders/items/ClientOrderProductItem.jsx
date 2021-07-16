import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { HOST } from '../../../service/api';
import fa from '../../../translation/fa';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  count: {
      color: "#444"
  },
  container: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  value: {
    color: "#bf360c",
    textAlign: "right"
  },
}));


const InvoiceContentItem = ({
  value,
  title
}) =>{
  const classes = useStyles();

  return (
    <>
    <ListItem className={classes.container} button>
        <ListItemText disableTypography className={classes.count} primary={ title } />
          <ListItemText disableTypography className={classes.value} primary={ value } />
    </ListItem>
    </>
  )
}

export default function ClientOrderProductItem({product, isGift}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense className={classes.root}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar
                src={ HOST + product.image}
              />
            </ListItemAvatar>
            <ListItemText primary={product.name} />
            <ListItemSecondaryAction> 
              { isGift && <CardGiftcardIcon/> }
            </ListItemSecondaryAction>
          </ListItem>
          { product.countInBasket > 0 && <InvoiceContentItem
            title={fa["box"]}
            value={product.countInBasket + "  " + fa["number"]}
          />}
          { product.unitCountInBasket > 0 && <InvoiceContentItem
            title={fa["unit"]}
            value={product.unitCountInBasket + "  " + fa["number"]}
          />}

    </List>
  );
}
