import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import fa from '../../../translation/fa';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TextField from '@material-ui/core/TextField';
import BallotIcon from '@material-ui/icons/Ballot';
import InboxIcon from '@material-ui/icons/Inbox';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonContainer: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
  }
}));

export function ClientProdoctBottomDrawer({
    onAddToBasket = () => null
}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [countInBasket, setCountInBasket] = React.useState(0);
  const [unitCountInBasket, setUnitCountInBasket] = React.useState(0);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

    function onCountChange(e) {
        setCountInBasket(e.target.value)
    }

    function onUnitCountChange(e) {
        setUnitCountInBasket(e.target.value)
    }

    function onSubmit() {
        toggleDrawer("bottom", false)
        if(countInBasket > 0 || unitCountInBasket > 0){
            onAddToBasket(Number(countInBasket), Number(unitCountInBasket))
        }
    }
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      <List>
        <ListItem button key={"Inbox"}>
            <ListItemIcon>
                <BallotIcon/>
            </ListItemIcon>
            <ListItemText primary={fa["box"]} />
            <TextField
                variant="outlined"
                margin="normal"
                required
                label={fa["count"]}
                autoFocus
                onChange={onCountChange}
                value={countInBasket}
                type="number"
            />
        </ListItem>
        <ListItem button key={"MailIcon"}>
            <ListItemIcon>
                <DynamicFeedIcon/>
            </ListItemIcon>
            <ListItemText primary={fa["unit"]} />
            <TextField
                variant="outlined"
                margin="normal"
                required
                label={fa["count"]}
                onChange={onUnitCountChange}
                value={unitCountInBasket}
                type="number"
            />
        </ListItem>
      </List>
      <Divider />
      <List className={classes.buttonContainer} >
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
            >
                {fa["submit"]}
            </Button>
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment >
            <Button  onClick={toggleDrawer("bottom", true)} endIcon={<AddShoppingCartIcon/>} size="small" color="primary">
            {fa["add to basket"]}
          </Button>
          <Drawer anchor={"bottom"} open={state["bottom"]} onClose={toggleDrawer("bottom", false)}>
            {list("bottom")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
