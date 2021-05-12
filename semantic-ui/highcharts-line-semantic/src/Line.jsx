import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import logo from "./assets//motor-red.png";

import { useData } from "@motor-js/engine";

const LineExampleCompact = () => {
  const colors = [
    "#B03060",
    "#FE9A76",
    "#FFD700",
    "#32CD32",
    "#016936",
    "#008080",
    "#0E6EB8",
    "#EE82EE",
    "#B413EC",
    "#FF1493",
    "#A52A2A",
    "#A0A0A0",
    "#000000",
  ];

  const cols = [
    {
      qField: "[OrderDate]",
      qLabel: "OrderDate",
    },
    {
      qField: "=sum(Quantity * Price)",
      qLabel: "Revenue",
      qNumType: "M",
      qNumFmt: "£#,##0",
    },
  ];

  const { dataSet, select } = useData({
    cols,
  });

  const { data } = dataSet;

  const chartData = data && data.map((p) => [p.OrderDate, p.Revenue]);
  const chartCatergories = data && data.map((p) => [p.OrderDate]);

  // <img
  //   src={logoLight}
  //   alt="Logo"
  //   style={{ height: "40px", width: "120px" }}
  // />;

  const options = {
    title: {
      text: "Revenue by Order Date",
    },
    subtitle: {
      text: 'built using: <a href="https://www.motor.so/">Motor</a>',
    },
    xAxis: {
      categories: chartCatergories,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Revenue (millions)",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Revenue: <b>{point.y:.1f} millions</b>",
    },
    colors,
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: function (event) {
            const element = data.filter((e) => e.label === event.point.name);
            select(0, [element[0].elemNumber], false);
          },
        },
      },
    },
    series: [
      {
        name: "Revenue",
        data: chartData,
      },
    ],
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Highcharts Column Chart</h1>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default LineExampleCompact;
