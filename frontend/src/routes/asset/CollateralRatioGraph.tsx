import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import assetAPI, { getHistoryI } from "../../api/assetAPI";
import { useEffect, useState } from "react";

interface SeriesData {
  name: string;
  type: string;
  data: number[];
}
interface colorFuncProps {
  value: number;
  seriesIndex: number;
  dataPointIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  w: any;
}

export default function CollateralRatioGraph() {
  const service = new assetAPI();
  const [series, setSeries] = useState<SeriesData[]>([]);
  const [options, setOption] = useState<ApexOptions>({});

  const fetch = async () => {
    const res = await service.getHistory();

    const asset: SeriesData = {
      name: "담보 자산 금액",
      type: "column",
      data: [],
    };

    const limit: SeriesData = {
      name: "설정한도",
      type: "line",
      data: [],
    };

    const minimum: SeriesData = {
      name: "한도유지 가능 금액",
      type: "line",
      data: [],
    };

    const s = [asset, limit, minimum];
    const xLabels: string[] = [];

    const data: getHistoryI[] = res.data;

    data.map((value) => {
      asset.data.push(value.mortgageSum);
      limit.data.push(value.todayLimit);
      minimum.data.push(value.maxLimit * 1.4);
      xLabels.push(
        value.createdAt.split("-")[1] + "-" + value.createdAt.split("-")[2]
      );
    });

    console.log(s);
    setSeries(s);

    const option: ApexOptions = {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [2],
        formatter: function (val: number) {
          return Math.trunc(val / 10000);
        },
      },
      stroke: {
        width: [0, 2, 2],
      },
      colors: [
        function ({ value, dataPointIndex }: colorFuncProps) {
          if (value < minimum.data[dataPointIndex]) {
            return "#D7263D";
          } else {
            return "#008FFB";
          }
        },
        "#2b908f",
        "#f9ce1d",
      ],
      xaxis: {
        categories: xLabels,
      },
      yaxis: [
        {
          title: {
            text: "(만원)",
          },
          labels: {
            formatter: function (val) {
              return Math.trunc(val / 10000)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          },
        },
      ],
      fill: {
        opacity: 1,
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return (
              Math.floor(val)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"
            );
          },
        },
      },
    };

    setOption(option);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <div>
        <p className="text-xl font-bold">담보유지비율 현황이에요</p>
      </div>
      <ReactApexChart
        type="line"
        series={series}
        options={options}
        height={350}
      />
      <p className="font-bold cursor-default">한도유지 가능 금액?</p>
      <div className="text-sm cursor-default">
        <p>
          고객님이 설정한 결제 한도를 보증할 수 있는 담보 증권의 최소
          금액이에요.
          <br />
          '담보증권가치 / 설정된 결제한도' 가 140% 이상이어야만 서비스를 이용할
          수 있어요.
          <br />
          만일 <span className="text-red-500 font-bold">140% 이하</span>인 경우
          결제가 중지되고 3 영업일 이내 복구하지 않으면 반대매매가 발생할 수
          있어요.
        </p>
      </div>
    </div>
  );
}
