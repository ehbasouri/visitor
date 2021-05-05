import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SimpleBreadcrumbs from '../items/SimpleBreadcrumbs';
import { Header } from '../../common/Header';
import CategoryItem from '../items/CategoryItem';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SceneWrapper from '../../../SceneWrapper/SceneWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Categories() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={"mainScreen"}>
        <Header/>
        <SimpleBreadcrumbs/>
        <List component="nav" aria-label="main mailbox folders">
        <CategoryItem icon={<ArrowBackIosIcon />} />
        <CategoryItem icon={<ArrowBackIosIcon />} />
        <CategoryItem icon={<ArrowBackIosIcon />} />
        <CategoryItem icon={<ArrowBackIosIcon />} />
        <CategoryItem icon={<AddCircleOutlineIcon/>} />
        </List>
    </div>
  );
}

export default SceneWrapper(Categories)
