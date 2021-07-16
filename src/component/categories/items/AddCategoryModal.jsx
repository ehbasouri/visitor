import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { API } from '../../../service/api';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import fa from '../../../translation/fa';

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

export default function AddCategoryModal({
    open, 
    setOpen,
    parId,
    addCategories,

    category,
    updateCategories
}) {
    const classes = useStyles();
    const [name, setName] = React.useState(category ? category.name : "");
    const [edge, setEdge] = React.useState(category ? category.edge : false);
    const [is_private, set_is_private] = React.useState(category ? category.is_private : false);
    
    const [loading, setLoading] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    function onNameChange(value) {
        setName(value.target.value)
    }

    async function updateCategoryItem(params) {
        setLoading(true);
        try {
            const {data} = await API.put("business/category", {name, edge, is_private},{catId: category._id});
            updateCategories({...data, name, edge})
        } catch (error) {
            console.log("error : ", error);
        }
        setLoading(false);
        setOpen(false)
        setName("")
    }

    async function addNewCategory(params) {
        setLoading(true);
        try {
            const {data} = await API.post("business/category",{name, edge, parId, is_private});
            addCategories(data)
        } catch (error) {
            console.log("error : ", error);
        }
        setLoading(false);
        setOpen(false);
        setName("");
    }

    async function onSubmit(params) {
        if (category) {
            updateCategoryItem()
        } else {
            addNewCategory()
        }
    }

    function handleChange(value) {
        setEdge(value.target.checked)
    }

    function handleIsPrivateChange(value) {
        set_is_private(value.target.checked)
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
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={fa["name"]}
                autoFocus
                onChange={onNameChange}
                value={name}
            />
             <FormControlLabel
                control={
                <Switch
                    checked={edge}
                    onChange={handleChange}
                    color="primary"
                />
                }
                label={fa["latest level"]}
            />
            <FormControlLabel
                control={
                <Switch
                    checked={is_private}
                    onChange={handleIsPrivateChange}
                    color="primary"
                />
                }
                label={fa["private category"]}
            />
            <Button
                loa
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
            >
                {fa["submit"]}
            </Button>
        </div>}
    </Modal>
  );
}
