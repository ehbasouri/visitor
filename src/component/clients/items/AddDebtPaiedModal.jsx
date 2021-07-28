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
import RadioForm from "../../../common/RadioForm"

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

export default function AddDebtPaiedModal({
    open, 
    setOpen,
    business_id,
    client_id,
    fetchData,
    client,
    business
}) {
    const classes = useStyles();
    const [amount, setAmount] = React.useState(0);
    const [is_debt, set_is_debt] = React.useState(false);
    const [description, set_description] = React.useState("");
    
    const [loading, setLoading] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    function onAmountChange(value) {
        setAmount(value.target.value)
    }

    function onDesChange(value) {
        set_description(value.target.value)
    }

    async function onSubmit(params) {
        setLoading(true);
        try {
            const paiedData = {
                amount: Number(amount),
                is_debt,
                business_id: business_id,
                client_id: client_id,
                business,
                client
            }
            if(description.length > 0){
                paiedData.description = description;
            }
            const {data} = await API.post("business/paied",paiedData);
            set_description("");
            set_is_debt(false);
            setAmount(0);
            fetchData();
        } catch (error) {
            console.log("error : ", error);
        }
        setLoading(false);
        setOpen(false);
        setAmount(0);
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
                type={"number"}
                fullWidth
                label={ is_debt ? fa["debt account"] : fa["paied amount"]}
                autoFocus
                onChange={onAmountChange}
                value={amount}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={ fa["description"]}
                onChange={onDesChange}
                value={description}
            />
            <RadioForm
                items={[{value: "is_debt", label: fa["add new debt"]},{value: "is_pay", label: fa["pay with client"]}]}
                // label={"is debt"}
                onValueChange={e=>set_is_debt(e === "is_debt" ? true : false)}
                value={is_debt ? "is_debt" : "is_pay"}
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
