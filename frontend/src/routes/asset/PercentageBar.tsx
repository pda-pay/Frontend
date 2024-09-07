import ReactApexChart from "react-apexcharts";

export interface PercentageBarProps {
  free: number;
  mortgaged: number;
}

export default function PercentageBar(props: PercentageBarProps) {
  return (
    <ReactApexChart
      type="bar"
      height={100}
      // width={350}
      series={[
        {
          name: "담보로 잡은 주식",
          data: [props.mortgaged],
        },
        {
          name: "담보로 잡지 않은 주식",
          data: [props.free],
        },
      ]}
      options={{
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          stackType: "100%",
          toolbar: {
            show: false,
          },
        },
        tooltip: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        xaxis: {
          labels: {
            show: false,
          },
        },
        yaxis: {
          floating: true,
          show: false,
          labels: {
            show: false,
          },
        },
      }}
    />
  );
}
