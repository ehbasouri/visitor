import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewListIcon from '@material-ui/icons/ViewList';
import PeopleIcon from '@material-ui/icons/People';
import { 
    Link,
    useLocation
  } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    position: "fixed" ,
    bottom: 0,
    width: "100%"
  },
});

function getRouteValue(key) {
    switch (key) {
        case "/admin/orders/active":
            return 2;
        case "/admin/orders/archive":
            return 2;
        case "/admin/orders":
            return 2;
        case "/admin/clients":
            return 1;
        case "/admin/settings":
            return 0;
        default:
            return 0;
    }
}

export default function BottomTabbar({setValue, value}) {
  const classes = useStyles();

  const location = useLocation();

  React.useEffect(() => {
    if(location && location.pathname)
        setValue(getRouteValue(location.pathname))
  }, [location]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        // setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
          <BottomNavigationAction 
              label={
                  <Link 
                      style={{color: value === 0 ? "blue" : "gray" }} 
                      to={"/admin/settings"}
                  >
                      <SettingsIcon color={ value === 0 ? "primary" : "disabled"} /> 
                  </Link>
              }
          />
        <BottomNavigationAction 
            label={
            <Link 
                style={{color: value === 1 ? "blue" : "gray" }} 
                to={"/admin/clients"} 
            >
                <PeopleIcon color={ value === 1 ? "primary" : "disabled"} /> 
            </Link>}/>
          <BottomNavigationAction 
            label={
            <Link 
                style={{color: value === 2 ? "blue" : "gray" }} 
                to={"/admin/orders/active"} 
            >
                <ViewListIcon color={ value === 2 ? "primary" : "disabled"} /> 
            </Link>}/>
    </BottomNavigation>
  );
}
