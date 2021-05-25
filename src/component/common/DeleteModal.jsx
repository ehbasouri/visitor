import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { API } from '../../service/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container:{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
  }
}));

export function DeleteModal({
    open, setOpen,
    onDelete,
    url,
    params
}) {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    async function onSubmit() {
        setLoading(true);
        try {
            const {data} = await API.del(url,params);
            if(onDelete) onDelete(data)
        } catch (error) {
            console.log("error : ", error);
        }
        setLoading(false);
        setOpen(false)
    }

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.container}
    >
        {loading ? <CircularProgress color="secondary" /> :
        <div className={classes.paper}>
            <p> Are you sure to delete ? </p>
            <Button
                loa
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
            >
                {"Delete"}
            </Button>
        </div>}
    </Modal>
  );
}
