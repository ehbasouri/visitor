import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  addIcon: {
      color: "#00c853"
  }
}));

export function AddOrRemoveItemButton({
    onAddPress = () => null,
    onRemovePress = () => null,
    product
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup size={"small"} >
        <IconButton onClick={onAddPress} >
            <AddCircleIcon className={classes.addIcon} />
        </IconButton>
        <IconButton>
            <Typography>
                {product.countInBasket}
            </Typography>
        </IconButton>
        <IconButton onClick={onRemovePress} >
            <RemoveCircleIcon color={"error"} />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}
