import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { 
  Link
} from "react-router-dom";
import fa from '../../../translation/fa';
import ListIcon from '@material-ui/icons/List';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function UserDrawer({id, client_name}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    > 
      <List>
        <ListItem button>
            <ListItemIcon> 
                <Avatar />
            </ListItemIcon>
            {/* <ListItemText primary={fa["setting"]} /> */}
        </ListItem>
      </List>
      <Divider />
        <Link to={"/admin/clientorderlist/" + client_name + "/" + id} style={{color: "#222"}}>
            <ListItem button>
                <ListItemIcon> 
                  <ListIcon /> 
                </ListItemIcon>
                <ListItemText primary={fa["orders"]} />
            </ListItem>
        </Link>
        <Link to={"/admin/debtclient/" + client_name + "/" + id} style={{color: "#222"}}>
            <ListItem button>
                <ListItemIcon> 
                  <AttachMoneyIcon /> 
                </ListItemIcon>
                <ListItemText primary={fa["debt"]} />
            </ListItem>
        </Link>
        <Link to={"/admin/settingclient/" + id} style={{color: "#222"}}>
            <ListItem button>
                <ListItemIcon> 
                  <SettingsIcon /> 
                </ListItemIcon>
                <ListItemText primary={fa["setting"]} />
            </ListItem>
        </Link>
      {/* <List>
          <ListItem button>
            <ListItemIcon> 
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"text"} />
          </ListItem>
      </List> */}
    </div>
  );

  return (
    <div>
        {/* <React.Fragment > */}
          <MoreVertIcon onClick={toggleDrawer("right", true)}/>
          <Drawer anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)}>
            {list("right")}
          </Drawer>
        {/* </React.Fragment> */}
    </div>
  );
}
