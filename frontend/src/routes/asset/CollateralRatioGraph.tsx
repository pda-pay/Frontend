import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface SeriesData {
  name: string;
  type: string;
  data: number[];
}
interface colorFuncProps {
  value: number;
  seriesIndex: number;
  dataPointIndex: number;
  w: any;
}

export default function CollateralRatioGraph() {
  const asset = {
    name: "담보 자산 금액",
    type: "column",
    data: [
      441020, 550300, 571230, 560200, 610800, 580900, 630120, 600640, 665800,
      1123050,
    ],
  };

  const limit = {
    name: "설정한도",
    type: "line",
    data: [
      400000, 410000, 400000, 400000, 600000, 500000, 310000, 300000, 420000,
      400000,
    ],
  };

  const minimum = {
    name: "한도유지 가능 금액",
    type: "line",
    data: limit.data.map((value) => {
      return 1.4 * value;
    }),
  };

  const series = [asset, limit, minimum];

  const xLabels = [
    "08/29",
    "08/30",
    "08/31",
    "09/01",
    "09/02",
    "09/03",
    "09/04",
    "09/05",
    "09/06",
    "09/07",
  ];

  const options: ApexOptions = {
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
      formatter: function (val) {
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
            return Math.trunc(val / 10000);
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
          return val + "원";
        },
      },
    },
  };

  return (
    <div className="flex flex-col justify-center">
      <div>
        <p className="text-xl font-bold">담보유지비율 현황이에요</p>
      </div>
      <div className="flex flex-col w-full items-end">
        <p className="text-lg">현재 사용금액: {100000}원</p>
      </div>
      <ReactApexChart
        type="line"
        series={series}
        options={options}
        height={350}
      />
      <p className="font-bold">한도유지 가능 금액?</p>
      <div className="text-sm">
        <p>
          고객님이 설정한 결제 한도를 보증할 수 있는 담보 증권의 최소
          금액이에요.
          <br />
          담보증권가치 / 설정된 결제한도 가 140% 이상이여야만 서비스를 이용할 수
          있어요
          <br />
          만일 140% 이하인 경우 결제가 중지되고 3 영업일 이내 복구하지 않으면
          반대매매가 발생할 수 있어요
        </p>
      </div>
    </div>
  );
}
