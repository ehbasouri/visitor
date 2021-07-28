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

const today = new Date();
today.setHours(0,0,0,0);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0,0,0,0);

const useStyles = makeStyles((theme) => ({
    chartContainer: {
        marginTop: theme.spacing(8)
    }
}));

function Analytics() {

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

    useEffect(()=>{
        // fetchAnalytics();
        fetchOrders();
    },[fromDate, toDate]);

    async function fetchAnalytics() {
        try {
            const {data} = await API.get("analytics",{
                fromDate, toDate
            });
            const computedData = normalizedAnalyticsData(data);
            setAnalyticsData(computedData);
        } catch (error) {
            console.log("error : ", error)
        }
    }

    async function fetchOrders() {
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
            console.log("data : ", data);
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
            console.log("orders :: ", orders)
        } catch (error) {
            console.log("error : ", error);
            console.log("error : ", error.response);
        }
    }


    function setFilterDate({start, end}) {
        setFromDate(start)
        setToDate(end)
    }

    console.log("analyticsData : ", analyticsData);

    return(
        <div className={"mainScreen"}>
            <Header/>
            <div className={"mainContainer"} >
                <MainScreen>
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
                </MainScreen>
            </div>
        </div>
    )
}

export default SceneWrapper(Analytics);