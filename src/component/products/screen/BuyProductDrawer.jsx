import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import fa from '../../../translation/fa';

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

export function BuyProductDrawer({
    onAddNewBuy = () => null
}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [count, setCount] = React.useState(0);
  const [buyPrice, setBuyPrice] = React.useState(0);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

    function onCountChange(e) {
        setCount(e.target.value)
    }

    function onUnitCountChange(e) {
        setBuyPrice(e.target.value)
    }

    function onSubmit() {
        toggleDrawer?.("bottom", false)?.("bottom", false)
        if(count > 0 || buyPrice > 0){
            onAddNewBuy(Number(count), Number(buyPrice))
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
            <TextField
                variant="outlined"
                margin="normal"
                required
                label={fa["count"]}
                autoFocus
                onChange={onCountChange}
                value={count}
                type="number"
            />
        </ListItem>
        <ListItem button key={"MailIcon"}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                label={fa["buy price"]}
                onChange={onUnitCountChange}
                value={buyPrice}
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
            <Button  
                onClick={toggleDrawer("bottom", true)} 
                type="submit"
                fullWidth
                variant="outlined"
                className={classes.submit}
                color="primary"
                >
                {fa["buy"]}
          </Button>
          <Drawer anchor={"bottom"} open={state["bottom"]} onClose={toggleDrawer("bottom", false)}>
            {list("bottom")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
