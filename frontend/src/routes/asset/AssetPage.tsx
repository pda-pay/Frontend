import { useEffect, useState } from "react";
import userAPI from "../../api/userAPI";
import CollateralRatioGraph from "./CollateralRatioGraph";
import MortgageState from "./MortgageState";
import StockPieChart from "./StockPieChart";
import axios from "axios";

export default function AssetPage() {
  const service = new userAPI();
  const [name, setName] = useState<string>("익명");

  const getUserInfo = async () => {
    try {
      const response = await service.checkMem();

      if (response.status === 200) {
        setName(response.data.name);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("에러 발생: " + error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div
      style={{ backgroundColor: "#9abade33" }}
      className="w-screen p-5 pt-7 pb-20 flex flex-col"
    >
      <p className="text-lg">
        <strong className="font-bold">{name}님,</strong>자산 현황을 확인해보세요
      </p>
      <StockPieChart />

      <CollateralRatioGraph />

      <MortgageState />
    </div>
  );
}
