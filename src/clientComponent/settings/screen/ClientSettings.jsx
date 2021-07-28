import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AuthContext from '../../../App/AuthApi';
import { 
  Link
} from "react-router-dom";
import ClientSceneWrapper from '../../../SceneWrapper/ClientSceneWrapper';
import { Header } from '../../../common/Header';
import fa from '../../../translation/fa';
import MainScreen from '../../../common/MainScreen';
import PersonIcon from '@material-ui/icons/Person';
import { useDispatch } from "react-redux";
import { updateGeneralProps } from '../../../redux/actions';
import { RESET_GENERAL_PROPS } from '../../../consts';
import { firebsaeAnalyticsLogEvent } from '../../../utils/firebaseAnalyticsLogEvent';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    text: {
        textAlign: "left"
    }
}));

function ClientSettings() {
  const classes = useStyles();
  const Auth = useContext(AuthContext);

  const dispatch = useDispatch()

  useEffect(()=>{
    firebsaeAnalyticsLogEvent("client_setting_screen");
  },[])

  function onLogout(params) {
    localStorage.removeItem("token");
    Auth.signOut();
    dispatch(updateGeneralProps({
      key: RESET_GENERAL_PROPS
    }))
  }

  return (
    <div className={"mainScreen"}>
        <Header
            backEnabled={false}
            title={"تنظیمات"}
        />
      <MainScreen>
        <List component="nav" aria-label="main mailbox folders">
          <Link to={"userinfo"} style={{color: "#222"}} >
              <ListItem button>
                  <ListItemIcon>
                      <PersonIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.text}   primary={fa["profile"]} />
              </ListItem>
          </Link>
          <Link to={"debts"} style={{color: "#222"}}>
              <ListItem button>
              <ListItemIcon>
                  <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText className={classes.text} primary={fa["debt account"]} />
              </ListItem>
          </Link>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem onClick={onLogout} button>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText className={classes.text} primary={fa["exit"]} />
          </ListItem>
        </List>
      </MainScreen>
    </div>
  );
}

export default ClientSceneWrapper(ClientSettings);