import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';

const ColumnChart = ({
    data
}) => {
  
  var config = {
    data: data,
    isGroup: true,
    xField: 'year',
    yField: 'price',
    seriesField: 'name',
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };
  return <Column {...config} />;
};

export default ColumnChart;