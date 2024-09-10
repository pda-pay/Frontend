import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import payServiceAPI from "../../api/payServiceAPI";

export default function StockPieChart() {
  const [series, setSeries] = useState<number[]>([]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      width: 350,
    },
    legend: {
      position: "bottom",
    },
  });
  const [companyList, setCompanyList] = useState<string[]>([]);
  const [totalData, setTotalData] = useState<TotalData>({});
  const [clickedIndex, setClickedIndex] = useState<number>(0);

  const service = new payServiceAPI();

  interface DataPerCompany {
    series: number[];
    labels: string[];
  }

  interface TotalData {
    [key: string]: DataPerCompany; // "전체"와 각 회사 이름을 위한 데이터
  }

  const fetchData = async () => {
    const result = await service.getAllStock();

    const processedData: TotalData = {
      전체: {
        series: [],
        labels: [],
      },
      담보: {
        series: [],
        labels: [],
      },
    };

    result.data.stockMortgagedStocks.forEach((stock: any) => {
      const {
        companyName,
        stockName,
        quantity,
        stockPrice,
        mortgagedQuantity,
      } = stock;
      const totalValue = quantity * stockPrice;

      const mortgaged = mortgagedQuantity * stockPrice;
      if (mortgaged > 0) {
        processedData["담보"].series.push(mortgaged);
        processedData["담보"].labels.push(stockName);
      }

      // "전체"에 모든 데이터 추가
      processedData["전체"].series.push(totalValue);
      processedData["전체"].labels.push(stockName);

      // 회사별 데이터 추가
      if (!processedData[companyName]) {
        processedData[companyName] = {
          series: [],
          labels: [],
        };
      }

      processedData[companyName].series.push(totalValue);
      processedData[companyName].labels.push(stockName);
    });

    if (processedData.담보.series.length == 0) {
      delete processedData.담보;
    }

    setCompanyList([...Object.keys(processedData)]);
    setTotalData(processedData);

    changeChartData(processedData["전체"], 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeChartData = (data: DataPerCompany, index: number) => {
    setClickedIndex(index);

    if (data.labels.length > 6) {
      const sum = data.series.slice(6).reduce((acc, curr) => acc + curr, 0);
      data.series.splice(6, data.series.length - 6, sum);
      data.labels.splice(6, data.labels.length - 6, "기타");
    }

    setSeries(data.series);

    const o: ApexOptions = {
      chart: {
        width: 350,
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      legend: {
        position: "bottom",
      },
      labels: data.labels,
    };

    setOptions(o);
  };

  return (
    <div className="flex flex-col justify-center bg-white rounded-lg my-5">
      <ReactApexChart options={options} series={series} type="pie" />
      <div className="flex flex-row pt-5 pb-2 px-4 justify-start overflow-x-auto whitespace-nowrap">
        {companyList.map((value, index) => {
          return (
            <span
              key={index}
              className={`inline-block px-2 py-1 mx-2 ${
                index == clickedIndex ? "bg-cyan-300" : "bg-gray-200"
              } text-gray-800 rounded-lg shadow-md`}
              onClick={() => {
                changeChartData(totalData[value], index);
              }}
            >
              {value}
            </span>
          );
        })}
      </div>
    </div>
  );
}
