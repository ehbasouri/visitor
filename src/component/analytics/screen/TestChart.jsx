import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
  const data = [
    { 
        year: '01/02/99', 
        name: "buy_price" , 
        price: 10002340 
    },
    { 
        year: '02/02/99', 
        name: "buy_price" , 
        price: 20343212 
    },
    { 
        year: '03/02/99', 
        name: "buy_price" , 
        price: 32343682 
    },
    { 
        year: '04/02/99', 
        name: "buy_price" , 
        price: 40949440 
    },
    { 
        year: '05/02/99', 
        name: "buy_price" , 
        price: 59983310 
    },
    { 
        year: '06/02/99', 
        name: "buy_price" , 
        price: 69923127 
    },
    { 
        year: '07/02/99', 
        name: "buy_price" , 
        price: 62343930 
    },
    { 
        year: '08/02/99', 
        name: "buy_price" , 
        price: 32343682 
    },
    { 
        year: '09/02/99', 
        name: "buy_price" , 
        price: 42343440 
    },
    { 
        year: '10/02/99', 
        name: "buy_price" , 
        price: 52343310 
    },
    { 
        year: '11/02/99', 
        name: "buy_price" , 
        price: 62343127 
    },
    { 
        year: '12/02/99', 
        name: "buy_price", 
        price: 62343930
    },{ 
      year: '13/02/99', 
      name: "buy_price" , 
      price: 10002340 
  },
  { 
      year: '14/02/99', 
      name: "buy_price" , 
      price: 20343212 
  },
  { 
      year: '15/02/99', 
      name: "buy_price" , 
      price: 32343682 
  },
  { 
      year: '16/02/99', 
      name: "buy_price" , 
      price: 40949440 
  },
  { 
      year: '17/02/99', 
      name: "buy_price" , 
      price: 59983310 
  },
  { 
      year: '18/02/99', 
      name: "buy_price" , 
      price: 69923127 
  },
  { 
      year: '19/02/99', 
      name: "buy_price" , 
      price: 62343930 
  },
  { 
      year: '20/02/99', 
      name: "buy_price" , 
      price: 32343682 
  },
  { 
      year: '21/02/99', 
      name: "buy_price" , 
      price: 42343440 
  },
  { 
      year: '22/02/99', 
      name: "buy_price" , 
      price: 52343310 
  },
  { 
      year: '23/02/99', 
      name: "buy_price" , 
      price: 62343127 
  },
  { 
      year: '24/02/99', 
      name: "buy_price", 
      price: 62343930
  },
  { 
    year: '25/02/99', 
    name: "buy_price" , 
    price: 10002340 
},
{ 
    year: '26/02/99', 
    name: "buy_price" , 
    price: 20343212 
},
{ 
    year: '27/02/99', 
    name: "buy_price" , 
    price: 32343682 
},
{ 
    year: '28/02/99', 
    name: "buy_price" , 
    price: 40949440 
},
{ 
    year: '29/02/99', 
    name: "buy_price" , 
    price: 59983310 
},
{ 
    year: '30/02/99', 
    name: "buy_price" , 
    price: 69923127 
},
{ 
    year: '31/02/99', 
    name: "buy_price" , 
    price: 62343930 
},

    { 
        year: '01/02/99', 
        name: "earned" , 
        price: 1000234 
    },
    { 
        year: '02/02/99', 
        name: "earned" , 
        price: 2034321 
    },
    { 
        year: '03/02/99', 
        name: "earned" , 
        price: 3234368 
    },
    { 
        year: '04/02/99', 
        name: "earned" , 
        price: 4094944 
    },
    { 
        year: '05/02/99', 
        name: "earned" , 
        price: 5998331 
    },
    { 
        year: '06/02/99', 
        name: "earned" , 
        price: 6992312 
    },
    { 
        year: '07/02/99', 
        name: "earned" , 
        price: 6234393 
    },
    { 
        year: '08/02/99', 
        name: "earned" , 
        price: 3234368 
    },
    { 
        year: '09/02/99', 
        name: "earned" , 
        price: 4234344 
    },
    { 
        year: '10/02/99', 
        name: "earned" , 
        price: 5234331 
    },
    { 
        year: '11/02/99', 
        name: "earned" , 
        price: 6234312 
    },
    { 
        year: '12/02/99', 
        name: "earned", 
        price: 6234393
    }

    ,
    { 
        year: '01/02/99', 
        name: "price" , 
        price: 100023401 
    },
    { 
        year: '02/02/99', 
        name: "price" , 
        price: 203432121 
    },
    { 
        year: '03/02/99', 
        name: "price" , 
        price: 323436821 
    },
    { 
        year: '04/02/99', 
        name: "price" , 
        price: 409494401 
    },
    { 
        year: '05/02/99', 
        name: "price" , 
        price: 599833101 
    },
    { 
        year: '06/02/99', 
        name: "price" , 
        price: 699231271 
    },
    { 
        year: '07/02/99', 
        name: "price" , 
        price: 623439301 
    },
    { 
        year: '08/02/99', 
        name: "price" , 
        price: 323436821 
    },
    { 
        year: '09/02/99', 
        name: "price" , 
        price: 423434401 
    },
    { 
        year: '10/02/99', 
        name: "price" , 
        price: 523433101 
    },
    { 
        year: '11/02/99', 
        name: "price" , 
        price: 623431271 
    },
    { 
        year: '12/02/99', 
        name: "price", 
        price: 623439301
    }
  ];

const DemoLine: React.FC = () => {
  
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
      return type === 'price' ? '#F4664A' : type === 'earned' ? '#30BF78' : '#FAAD14';
    },
    lineStyle: function lineStyle(_ref2) {
      var type = _ref2.type;
      if (type === 'price') {
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

export default DemoLine;
// import React, { useState, useEffect } from 'react';
// import { Column } from '@ant-design/charts';

// const DemoColumn: React.FC = () => {
  
//   const data = [
//     { 
//         year: '01/02/99', 
//         name: "buy_price" , 
//         price: 10002340 
//     },
//     { 
//         year: '02/02/99', 
//         name: "buy_price" , 
//         price: 20343212 
//     },
//     { 
//         year: '03/02/99', 
//         name: "buy_price" , 
//         price: 32343682 
//     },
//     { 
//         year: '04/02/99', 
//         name: "buy_price" , 
//         price: 40949440 
//     },
//     { 
//         year: '05/02/99', 
//         name: "buy_price" , 
//         price: 59983310 
//     },
//     { 
//         year: '06/02/99', 
//         name: "buy_price" , 
//         price: 69923127 
//     },
//     { 
//         year: '07/02/99', 
//         name: "buy_price" , 
//         price: 62343930 
//     },
//     { 
//         year: '08/02/99', 
//         name: "buy_price" , 
//         price: 32343682 
//     },
//     { 
//         year: '09/02/99', 
//         name: "buy_price" , 
//         price: 42343440 
//     },
//     { 
//         year: '10/02/99', 
//         name: "buy_price" , 
//         price: 52343310 
//     },
//     { 
//         year: '11/02/99', 
//         name: "buy_price" , 
//         price: 62343127 
//     },
//     { 
//         year: '12/02/99', 
//         name: "buy_price", 
//         price: 62343930
//     },
//     { 
//         year: '01/02/99', 
//         name: "earned" , 
//         price: 10002340 
//     },
//     { 
//         year: '02/02/99', 
//         name: "earned" , 
//         price: 20343212 
//     },
//     { 
//         year: '03/02/99', 
//         name: "earned" , 
//         price: 32343682 
//     },
//     { 
//         year: '04/02/99', 
//         name: "earned" , 
//         price: 40949440 
//     },
//     { 
//         year: '05/02/99', 
//         name: "earned" , 
//         price: 59983310 
//     },
//     { 
//         year: '06/02/99', 
//         name: "earned" , 
//         price: 69923127 
//     },
//     { 
//         year: '07/02/99', 
//         name: "earned" , 
//         price: 62343930 
//     },
//     { 
//         year: '08/02/99', 
//         name: "earned" , 
//         price: 32343682 
//     },
//     { 
//         year: '09/02/99', 
//         name: "earned" , 
//         price: 42343440 
//     },
//     { 
//         year: '10/02/99', 
//         name: "earned" , 
//         price: 52343310 
//     },
//     { 
//         year: '11/02/99', 
//         name: "earned" , 
//         price: 62343127 
//     },
//     { 
//         year: '12/02/99', 
//         name: "earned", 
//         price: 62343930
//     }
//   ];
//   var config = {
//     data: data,
//     isGroup: true,
//     xField: 'year',
//     yField: 'price',
//     seriesField: 'name',
//     label: {
//       position: 'middle',
//       layout: [
//         { type: 'interval-adjust-position' },
//         { type: 'interval-hide-overlap' },
//         { type: 'adjust-color' },
//       ],
//     },
//   };
//   return <Column {...config} />;
// };

// export default DemoColumn;
// const data = [
//     { year: 'فروردین', population: 10002340 },
//     { year: 'اردیبهشت', population: 20343212 },
//     { year: 'خرداد', population: 32343682 },
//     { year: 'تیر', population: 40949440 },
//     { year: 'مرداد', population: 59983310 },
//     { year: 'شهریور', population: 69923127 },
//     { year: 'مهر', population: 62343930 },
//     { year: 'آبان', population: 32343682 },
//     { year: 'آذر', population: 42343440 },
//     { year: 'دی', population: 52343310 },
//     { year: 'بهمن', population: 62343127 },
//     { year: 'اسفند', population: 62343930 }
//   ];