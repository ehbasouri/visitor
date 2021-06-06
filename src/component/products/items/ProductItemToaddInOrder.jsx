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
import AddCircle from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
// import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  count: {
      color: "#d84315"
  }
}));

export default function ProductItemToaddInOrder({
  product, 
  productList = [], 
  setAddedProductList = () => null
}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(checkProduct());

  function checkProduct() {
    const index = productList.findIndex(element => element._id === product._id);
    return index > -1
  }

  function handleChange(event) {
    setChecked(event.target.checked);
    if(event.target.checked){
      setAddedProductList([...productList, {...product, countInBasket : 1}])
    } else{
      const updatedList = productList.filter((element)=>element._id !== product._id)
      setAddedProductList(updatedList);
    }
  }

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

            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
                {/* <IconButton onClick={()=>{
                        closeFnc()
                        onAddPress(product)
                    }} edge="center" color="inherit" >
                    <AddCircle />
                </IconButton> */}
            </ListItemSecondaryAction>
          </ListItem>
    </List>
  );
}
