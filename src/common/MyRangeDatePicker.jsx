import React from "react";
import { render } from "react-dom";
import { RangeDatePicker } from "jalali-react-datepicker";
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import fa from "../translation/fa";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    }
}));

export function MyRangeDatePicker({
    setFilterDate
}) {

    const [show, setShow] = useState(false)

    const classes = useStyles()

    function onClickSubmitButton({ start, end }) {
        setFilterDate({ start: start._d, end: end._d })
    }

    return(
        <div className={classes.root} >
            <IconButton onClick={()=>setShow(!show)} >
                {!show ?<FilterListIcon/> : <CloseIcon/>}
            </IconButton>
            {show && <RangeDatePicker
                toLabel={fa["to date"]}
                fromLabel={fa["from date"]}
                onClickSubmitButton={onClickSubmitButton}
            />}
        </div>
    )
}