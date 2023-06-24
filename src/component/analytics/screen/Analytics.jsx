import React from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { Header } from "../../../common/Header";
import MainScreen from "../../../common/MainScreen";
import fa from "../../../translation/fa";
import { makeStyles } from '@material-ui/core/styles';
import { API } from "../../../service/api";
import { useEffect } from "react";
import { useState } from "react";
import LineChart from "./LineChart";
import ColumnChart from "./ColumnChart";
import { MyRangeDatePicker } from '../../../common/MyRangeDatePicker';
import { normalizedAnalyticsData } from "../../../utils/normalizedAnalyticsData";
import {TotalItems} from "../items/TotalItems";
import numberWithCommas from '../../../utils/commaSeperator';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import { useCallback } from "react";
import { Button, TextField } from "@material-ui/core";
import { AlertComponent } from "../../../common/AlertComponent";

const today = new Date();
today.setHours(0,0,0,0);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0,0,0,0);

const useStyles = makeStyles((theme) => ({
    chartContainer: {
        marginTop: theme.spacing(8)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

function Analytics() {
    const [isAutenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const classes = useStyles();
    const user_info = useSelector(state=>state.general_reducer.user_info)

    const [analyticsData, setAnalyticsData] = useState({
        data: [],
        total_price: 0,
        total_buy_price: 0,
        total_earned: 0
    })

    const [fromDate, setFromDate] = useState(today)
    const [toDate, setToDate] = useState(tomorrow)


    // async function fetchAnalytics() {
    //     try {
    //         const {data} = await API.get("analytics",{
    //             fromDate, toDate
    //         });
    //         const computedData = normalizedAnalyticsData(data);
    //         setAnalyticsData(computedData);
    //     } catch (error) {
    //         console.log("error : ", error)
    //     }
    // }

    const fetchOrders = useCallback(async () => {
        const queries = {
          business_id : user_info._id, 
          status: "archive"
          // page: 20,
          // limit: 10
        }
        if(fromDate && toDate){
          queries.fromDate = fromDate
          queries.toDate = toDate
        }
        try {
            const {data} = await API.get("business/order", queries);
            const orders = []
            data.map(order => {
                const year = moment(order.updated_at).format('YYYY/MM/DD')
                const index = orders.findIndex(item=>item.year === year)
                if(index > -1) {
                    orders[index] = {
                        price : orders[index].price + order.price,
                        buy_price : orders[index].buy_price + order.buy_price,
                        discount : orders[index].discount + order.discount,
                        year
                    }
                } else {
                    orders.push({
                        price : order.price,
                        buy_price : order.buy_price,
                        discount : order.discount,
                        year
                    })
                }
            })
            const computedData = normalizedAnalyticsData(orders.reverse());
            setAnalyticsData(computedData);
        } catch (error) {
            console.log("error : ", error);
            console.log("error : ", error.response);
        }
    }, [fromDate, toDate, user_info._id])

    useEffect(()=>{
        // fetchAnalytics();
        fetchOrders();
    },[fetchOrders]);

    function setFilterDate({start, end}) {
        setFromDate(start)
        setToDate(end)
    }

    const onSubmit = () => {
        if (password === 'esiesi1731') {
            setIsAuthenticated(true)
            setShowAlert(false)
        } else {
            setShowAlert(true)
        }
    }

    return(
        <div className={"mainScreen"}>
            <Header/>
            <div className={"mainContainer"} >
                {isAutenticated ? <MainScreen>
                <MyRangeDatePicker
                    setFilterDate={setFilterDate}
                />

                    <TotalItems 
                        title={fa["total sale price"]} 
                        subTitle={converEnglishNumToPersian(numberWithCommas(analyticsData.total_price)) + " " + fa["toman"]}
                    />
                    <TotalItems 
                        title={fa["total buy price"]} 
                        subTitle={converEnglishNumToPersian(numberWithCommas(analyticsData.total_buy_price)) + " " + fa["toman"]}
                    />
                    <TotalItems 
                        title={fa["total earned"]} 
                        subTitle={converEnglishNumToPersian(numberWithCommas(analyticsData.total_earned)) + " " + fa["toman"] }
                    />
                    <div className={classes.chartContainer} >
                        {
                            analyticsData.data.length > 9 ?
                            <LineChart
                                data={analyticsData.data}
                            />
                            :
                            <ColumnChart
                                data={analyticsData.data}
                            />
                        }
                    </div>
                </MainScreen> : 
                <MainScreen>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={fa["password"]}
                        type="password"
                        autoComplete="current-password"
                        onChange={(element) => setPassword(element.target.value)}
                        value={password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSubmit}
                    >
                        {fa['submit']}
                    </Button>
                    <AlertComponent
                        open={showAlert}
                        setOpen={setShowAlert}
                        message={fa["please enter correct password"]}
                    />
                </MainScreen>
                }
            </div>
        </div>
    )
}

export default SceneWrapper(Analytics);