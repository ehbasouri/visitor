import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import OrderItem from '../items/OrderItem';
import { SearchInput } from '../../common/SearchInput';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    //   width: "100%"
  }
}));

function Orders() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={"mainScreen"}>
      <AppBar >
        <Tabs 
          variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="بایگانی" {...a11yProps(0)} />
          <Tab label="فعال" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div>
        <SearchInput/>
        <OrderItem/>
        <OrderItem/>
        <OrderItem/>
        <OrderItem/>
        <OrderItem/>
        <OrderItem/>
      </div>
    </div>
  );
}

export default Orders;
