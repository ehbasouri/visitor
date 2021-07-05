import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { API } from '../../../service/api';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SelectCategory from '../../../common/SelectCategory';
import fa from '../../../translation/fa';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100vw"
  },
  container:{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SelectCategoryModal({
    parId,
    addCategories,

    category,
    set_category,
    updateCategories
}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    function onEdgeClick(cat) {
        handleClose()
        set_category(cat);
    }

  return (
    <div>
        <Button className={classes.submit} onClick={()=>setOpen(true)} fullWidth size={"large"} variant="outlined">
            {category ? category.name : fa["Select category"]}
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.container}
        >
            <div className={classes.paper}>
                <SelectCategory
                    set_category={onEdgeClick}
                    client
                />
            </div>
        </Modal>
    </div>
  );
}
