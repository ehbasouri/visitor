import fa from "../translation/fa";
import moment from "jalali-moment";

moment.locale('fa', { useGregorianParser: true });

export function normalizedAnalyticsData(data = []) {
    const rawData = [];
    var total_buy_price = 0;
    var total_price = 0;
    var total_earned = 0;

    data.map(item=>{ 
        total_buy_price = total_buy_price + item.buy_price;
        total_price = total_price + item.price
        total_earned = total_earned + (item.price - item.buy_price);
        rawData.push({
            year: item.year,
            name: fa["buy price"] , 
            price: item.buy_price
        })
        rawData.push({
            year: item.year,
            name: fa["sale price"] , 
            price: item.price
        })
        rawData.push({
            year: item.year,
            name: fa["earned"] ,
            price: item.price - item.buy_price
        })
    })
    return {
        data: rawData,
        total_buy_price,
        total_price,
        total_earned
    }
}