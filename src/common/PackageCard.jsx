import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import fa from '../translation/fa';
import converEnglishNumToPersian from '../utils/EnglishNumToPersianNum';
import numberWithCommas from '../utils/commaSeperator';
import { useHistory } from 'react-router-dom';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import CardHeader from '@material-ui/core/CardHeader';
import { DeleteModal } from '../common/DeleteModal';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: "16px",
    marginLeft: "8px",
    marginRight: "8px",
    backgroundColor: "#ffccbc"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
      color: "red"
  }
});

export function PackageCard({item, admin = false, link = "editpackage/", onDeleteProduct}) {

  const classes = useStyles();
  const history = useHistory()
  const [showDelModal, setShowDelModal] = useState(false);


  const onDetailePress=()=>{
    history.push(link + item._id);
  }

  return (
    <>
      <Card className={classes.root} >
        <CardContent>
          <CardGiftcardIcon/>
          <Typography align={"left"} variant="h5" component="h2">        
            {item.name}
          </Typography>
          <Typography align={"left"} className={classes.pos} color="textSecondary">
            {`${converEnglishNumToPersian(numberWithCommas(item.price))} ${fa["toman"]}`}
          </Typography>
          <Typography align={"left"} variant="body2" component="p">
            {item.comment}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onDetailePress} className={classes.button} size="small">{fa["detailes"]}</Button>
          {admin && <Button onClick={()=>setShowDelModal(true)} endIcon={<DeleteIcon/>} size="small" color="primary">
            {fa["delete"]}
          </Button>}
        </CardActions>
      </Card>

      <DeleteModal
        open={showDelModal}
        setOpen={setShowDelModal}
        onDelete={onDeleteProduct}
        url={"package"}
        params={{id : item._id}}
      />
    </>
  );
}
