import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import BallotIcon from '@material-ui/icons/Ballot';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExitToApp from '@material-ui/icons/ExitToApp';
import CategoryIcon from '@material-ui/icons/Category';
import Cookies from "js-cookie";
import AuthContext from '../../../App/AuthApi';
import { 
  Link
} from "react-router-dom";
import StoreIcon from '@material-ui/icons/Store';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import { Header } from '../../common/Header';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    text: {
        textAlign: "left"
    }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function Settings() {
  const classes = useStyles();
  const Auth = useContext(AuthContext);

  function onLogout(params) {
    Cookies.remove("token");
    Auth.setAuth(false);
  }

  return (
    <div className={"mainScreen"}>
        <Header
            backEnabled={false}
            title={"تنظیمات"}
        />
      <List component="nav" aria-label="main mailbox folders">
        <Link to={"categories"} style={{color: "#222"}} >
            <ListItem button>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText className={classes.text}   primary="دسته بندی" />
            </ListItem>
        </Link>
        <Link style={{color: "#222"}} to={"products"} >
            <ListItem button>
            <ListItemIcon>
                <BallotIcon />
            </ListItemIcon>
            <ListItemText className={classes.text} primary="محصولات" />
            </ListItem>
        </Link>
        <Link style={{color: "#222"}}>
            <ListItem button>
            <ListItemIcon>
                <StoreIcon />
            </ListItemIcon>
            <ListItemText className={classes.text} primary="انبار" />
            </ListItem>
        </Link>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem onClick={onLogout} button>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText className={classes.text} primary="خروج" />
        </ListItem>
      </List>
    </div>
  );
}

export default SceneWrapper(Settings);