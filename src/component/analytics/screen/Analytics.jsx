import React from "react";
import SceneWrapper from "../../../SceneWrapper/SceneWrapper";
import { Header } from "../../../common/Header";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MainScreen from "../../../common/MainScreen";
import fa from "../../../translation/fa";
import { makeStyles } from '@material-ui/core/styles';
import { API, HOST } from "../../../service/api";
import {useParams} from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import LineChart from "./LineChart";
import ColumnChart from "./ColumnChart";
import { MyRangeDatePicker } from '../../../common/MyRangeDatePicker';
import { normalizedAnalyticsData } from "../../../utils/normalizedAnalyticsData";
import {TotalItems} from "../items/TotalItems";
import numberWithCommas from '../../../utils/commaSeperator';
import converEnglishNumToPersian from '../../../utils/EnglishNumToPersianNum';

const useStyles = makeStyles((theme) => ({
    chartContainer: {
        marginTop: theme.spacing(8)
    }
}));

function Analytics() {

    const classes = useStyles();

    const [analyticsData, setAnalyticsData] = useState({
        data: [],
        total_price: 0,
        total_buy_price: 0,
        total_earned: 0
    })
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)

    useEffect(()=>{
        fetchAnalytics();
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


    function setFilterDate({start, end}) {
        setFromDate(start)
        setToDate(end)
    }


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