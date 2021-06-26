import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {useHistory} from "react-router-dom";
import { HOST } from '../../../service/api';
import fa from '../../../translation/fa';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { BUSINESS } from '../../../consts';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: 16,
    width: "100%"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function BusinessItem({business}) {

    const history = useHistory()

  const classes = useStyles();
  const dispatch = useDispatch()

  function onItemPress(params) {
      dispatch(updateGeneralProps({
          key: BUSINESS,
          value: business
      }))
      history.push("/products/" + business._id)
  }

  return (
    <Card onClick={onItemPress} className={classes.root}>
      <CardMedia
        className={classes.media}
        image={HOST + business.avatar}
        title="Paella dish"
      />
      <CardContent>
        <Typography align={"left"} variant="h5" component="h5">
          {business.name}
        </Typography>
        <Typography align={"left"} variant="body2" color="textSecondary" component="p">
          {business.address}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary">
            {fa["show products"]}
        </Button>
      </CardActions>
    </Card>
  );
}
