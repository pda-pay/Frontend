import { useEffect, useState } from "react";
import userAPI from "../../api/userAPI";
import CollateralRatioGraph from "./CollateralRatioGraph";
import MortgageState from "./MortgageState";

import axios from "axios";
import StockPieChart from "./StockPieChart";

export default function AssetPage() {
  const service = new userAPI();
  const [name, setName] = useState<string>("익명");
  const [member, setMember] = useState<boolean>(false);

  const getUserInfo = async () => {
    try {
      const response = await service.checkMem();

      if (response.status === 200) {
        setName(response.data.name);
        setMember(response.data.paymentServiceMember);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("에러 발생: " + error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{ backgroundColor: "#9abade33" }}
      className="w-screen p-5 pt-7 pb-20 flex flex-col"
    >
      <p className="text-lg cursor-default">
        <strong className="font-bold">{name}님,</strong>자산 현황을 확인해보세요
      </p>
      <StockPieChart />
      <div className="relative">
        <div className={`${!member ? "filter blur-sm" : ""}`}>
          <CollateralRatioGraph />
          <MortgageState />
        </div>
        {!member && (
          <div className="absolute inset-0 flex items-center justify-center text-black text-xl font-bold">
            결제 서비스 가입 후 이용 가능합니다.
          </div>
        )}
      </div>
    </div>
  );
}
