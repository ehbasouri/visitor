import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import fa from '../../../translation/fa';

const LineChart = ({
    data
}) => {

  console.log("line chart  : ", data);
  
  var config = {
    data: data,
    xField: 'year',
    yField: 'price',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    seriesField: 'name',
    color: function color(_ref) {
      var type = _ref.name;
      return type === fa["buy price"] ? '#F4664A' : type === fa["earned"] ? '#30BF78' : '#FAAD14';
    },
    lineStyle: function lineStyle(_ref2) { 
      var type = _ref2.name;
      if (type === fa["buy price"]) {
        return {
          lineDash: [4, 4],
          opacity: 1,
        };
      }
      return { opacity: 0.5 };
    },
  };
  return (
    <Line {...config} />
  )
};

export default LineChart;
