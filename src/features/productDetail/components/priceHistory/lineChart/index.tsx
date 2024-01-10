import { useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import TranslatedText from "components/translatedText";
import { useTranslation } from "react-i18next";

interface SamplePropsTwo {
  priceHistory?: string;
  currency_symbol?: string;
}

type Props = HighchartsReact.Props | SamplePropsTwo;

const LineChart = (props: Props) => {
  const { priceHistory, currency_symbol } = props;
  const [dataSource, setDataSource] = useState(null);
  const [plotLines, setPlotLines] = useState<any[]>([]);
  const [months, setMonths] = useState(null);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (priceHistory) {
      let { web_chart, highest_price, lowest_price } = priceHistory;
      setDataSource(web_chart.values);
      setMonths(web_chart.months);
      let min = Math.min(...web_chart.values);
      let max = Math.max(...web_chart.values);
      setPlotLines([
        {
          color: "red",
          width: 2,
          value: max,
          strokeWidth: 2,
          dashStyle: "Dash",
          label: {
            text: `${t("product.priceHistory.highest")}: ${Math.floor(max)}`,
            align: "right",
            style: {
              color: "red",
              fontSize: "14px",
              // padding: 20
            },
          },
        },
        {
          color: "green",
          width: 2,
          value: min,
          strokeWidth: 2,
          dashStyle: "Dash",
          label: {
            text: `${t("product.priceHistory.lowest")}Lowest: ${Math.floor(
              min
            )}`,
            align: "right",
            style: {
              color: "green",
              fontSize: "14px",
              // padding: 20
            },
          },
        },
      ]);
    }
  }, [priceHistory]);

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "",
    },
    // yAxis: {
    //   labels: {
    //     enabled: true,
    //   },
    //   // plotLines: plotLines,
    // },
    // credits: {
    //   enabled: false,
    // },
    xAxis: {
      type: "datetime",
      categories: months,
    },
    tooltip: {
      shared: true,
      useHTML: true,
      backgroundColor: "#876aca",
      borderColor: "#876aca",
      borderRadius: 20,
      padding: 10,
      style: {
        color: "white",
        fontSize: "14px",
      },
      xDateFormat: "%Y-%m-%d",
      // headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
      // pointFormat:
      //   '<tr><td style="color: {series.color}">{series.name} </td>' +
      //   '<td style="text-align: right"><b>{point.y}</b></td></tr>',
      // footerFormat: "</table>",
      // headerFormat: '<div style:"border-radius:6px; background:red;"><h4 style="">{point.key}</h4>',
      // pointFormat: `<div><b>${t(
      //   "product.priceHistory.current"
      // )}: ${currency_symbol}{point.y}</b></div>`,
      // valueDecimals: 0,
    },
    series: [
      {
        showInLegend: false,
        data: dataSource,
        name: `Current Price`,
        color: "#876aca",
      },
    ],
    // title: {
    //   text: "",
    //   style: {
    //     display: "none",
    //   },
    // },
    // subtitle: {
    //   text: "",
    //   style: {
    //     display: "none",
    //   },
    // },
    // series: [
    //   {
    //     type: "line",
    //     data: dataSource,
    //   },
    // ],
    // xAxis: {
    //   categories: [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ],
    // },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};

export default LineChart;
