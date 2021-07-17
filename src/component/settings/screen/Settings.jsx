import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import BallotIcon from '@material-ui/icons/Ballot';
import ExitToApp from '@material-ui/icons/ExitToApp';
import CategoryIcon from '@material-ui/icons/Category';
import Cookies from "js-cookie";
import AuthContext from '../../../App/AuthApi';
import { 
  Link
} from "react-router-dom";
import StoreIcon from '@material-ui/icons/Store';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';
import { Header } from '../../../common/Header';
import MainScreen from '../../../common/MainScreen';
import fa from '../../../translation/fa';
import PersonIcon from '@material-ui/icons/Person';
import { useDispatch } from "react-redux";
import { updateGeneralProps } from '../../../redux/actions';
import { RESET_GENERAL_PROPS } from '../../../consts';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
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

function Settings() {
  const classes = useStyles();
  const Auth = useContext(AuthContext);

  const dispatch = useDispatch()

  function onLogout(params) {
    Cookies.remove("token");
    Auth.signOut();
    dispatch(updateGeneralProps({
      key: RESET_GENERAL_PROPS
    }))
  }

  return (
    <div className={"mainScreen"}>
        <Header
            backEnabled={false}
            title={fa["setting"]}
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
          <Link to={"categories"} style={{color: "#222"}} >
              <ListItem button>
                  <ListItemIcon>
                      <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.text}   primary={fa["category"]} />
              </ListItem>
          </Link>
          <Link style={{color: "#222"}} to={"products"} >
              <ListItem button>
              <ListItemIcon>
                  <BallotIcon />
              </ListItemIcon>
              <ListItemText className={classes.text} primary={fa["products"]} />
              </ListItem>
          </Link>
          <Link to={"stores"} style={{color: "#222"}}>
              <ListItem button>
              <ListItemIcon>
                  <StoreIcon />
              </ListItemIcon>
              <ListItemText className={classes.text} primary={fa["store"]} />
              </ListItem>
          </Link>
          <Link to={"analytics"} style={{color: "#222"}}>
              <ListItem button>
              <ListItemIcon>
                  <ShowChartIcon />
              </ListItemIcon>
              <ListItemText className={classes.text} primary={fa["analytics"]} />
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

          <Link to={"packages"} style={{color: "#222"}}>
              <ListItem button>
              <ListItemIcon>
                  <LocalMallIcon />
              </ListItemIcon>
              <ListItemText className={classes.text} primary={fa["package"]} />
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

export default SceneWrapper(Settings);