import React, {useRef} from "react";
import { render } from "react-dom";
import { RangeDatePicker } from "jalali-react-datepicker";
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import fa from "../translation/fa";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DateObject from "react-date-object"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonClass: {
        padding: theme.spacing(4),
        borderRadius: theme.spacing(4)
    }
}));

export function MyRangeDatePicker({
    setFilterDate
}) {

    const datePickerRef = useRef(undefined)

    const [show, setShow] = useState(false)
    const [values, setValues] = useState([
        new Date(),
        new Date()
      ])
    const classes = useStyles()

    function onClickSubmitButton() {
        setFilterDate({ 
            start: new Date(values[0]), 
            end: new Date(values[1]) 
        })
        datePickerRef.current.closeCalendar()
    }

    function onValueChange(e) {
        setValues([new Date(e[0]), new Date(e[1])])
    }


    return(
        <div className={classes.root} >
            <div style={{ direction: "rtl"}}>
                <DatePicker
                    value={values}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={onValueChange}
                    range
                    fixMainPosition={true}
                    ref={datePickerRef}
                >
                    <div className={classes.buttonContainer} >
                        <button
                            className={classes.button}
                        style={{ margin: "5px", 
                                padding: "3px",
                                paddingRight: "10px",
                                paddingLeft: "10px",
                                borderRadius: "5px" }}
                        onClick={() => datePickerRef.current.closeCalendar()}
                        >
                            {fa["cancel"]}
                        </button>
                        <button
                        style={{ margin: "5px", 
                                padding: "3px",
                                paddingRight: "10px",
                                paddingLeft: "10px",
                                borderRadius: "5px" }}
                        onClick={onClickSubmitButton}
                        >
                            {fa["select"]}
                        </button>
                    </div>
                </DatePicker>
            </div>
        </div>
    )
}