import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function StockPieChart() {
  const [series, setSeries] = useState<number[]>([]);
  const [options, setOptions] = useState<ApexOptions>({});

  useEffect(() => {
    console.log("test");
    const s = [44, 30, 20, 13, 43, 10, 10, 5, 2];
    const l = [
      "두원기공",
      "하이닉스",
      "포스코",
      "SK",
      "LG",
      "삼성전자",
      "테슬라",
      "삼성바이오로직스",
      "두나무",
    ];

    if (s.length > 6) {
      const sum = s.slice(6).reduce((acc, curr) => acc + curr, 0);
      s.splice(6, s.length - 6, sum);
      l.splice(6, l.length - 6, "기타");
    }

    const o: ApexOptions = {
      chart: {
        width: 350,
      },
      labels: l,
      legend: {
        position: "bottom",
      },
    };

    setSeries(s);
    setOptions(o);
  }, []);

  return (
    <div className="flex justify-center bg-white rounded-lg my-5">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={350}
      />
    </div>
  );
}
