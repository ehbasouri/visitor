import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { HOST } from '../../../service/api';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { 
  Link
} from "react-router-dom";
import { DeleteModal } from '../../../common/DeleteModal';
import fa from '../../../translation/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import 'react-lazy-load-image-component/src/effects/blur.css';

const useStyles = makeStyles({
  root: {
    marginTop: 16,
    maxWidth: 345,
    width: "100%"
  },
  image: {
    minHeight: 200
  }
});

export default function ProductItem({product, onDeleteProduct}) {
  const classes = useStyles();
  const [showDelModal, setShowDelModal] = useState(false);

  return (
    <>
    <Card className={classes.root}> 
      <CardActionArea>
        <LazyLoadImage
          alt="Contemplative Reptile"
          // height={200}
          src={HOST + product.image} 
          width="100%"
          effect={"blur"}
          className={classes.image}
          />
        <CardContent>
          <Typography align={"left"} gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography align={"left"} variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link style={{color: "#fff"}} to={"editproduct/" + product._id} >
          <Button endIcon={<EditIcon/>} size="small" >
            {fa["edit"]}
          </Button>
        </Link>
        <Button onClick={()=>setShowDelModal(true)} endIcon={<DeleteIcon/>} size="small" color="primary">
          {fa["delete"]}
        </Button>
      </CardActions>
    </Card>
      <DeleteModal
          open={showDelModal}
          setOpen={setShowDelModal}
          onDelete={onDeleteProduct}
          url={"business/product"}
          params={{id : product._id}}
      />
      </>
  );
}
