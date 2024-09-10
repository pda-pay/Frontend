import { useEffect, useState } from "react";
import userAPI from "../../api/userAPI";
import CollateralRatioGraph from "./CollateralRatioGraph";
import MortgageState from "./MortgageState";

import axios from "axios";
import StockPieChart from "./StockPieChart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface checkMem {
  name: string;
  paymentAccess: boolean;
  paymentServiceMember: boolean;
  userId: string;
}

export default function AssetPage() {
  const service = new userAPI();
  const [name, setName] = useState<string>("익명");
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await service.checkMem();

      if (response.status === 200) {
        const data: checkMem = response.data;

        if (!data.paymentServiceMember) {
          Swal.fire({
            icon: "warning",
            title: `<span style="font-size: 20px; font-weight : bolder;">결제 서비스에<br/>가입하지 않으셨습니다.</span>`,
            confirmButtonColor: "blue",
          }).then(() => {
            navigate(-1);
          });
        }

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
      <CollateralRatioGraph />
      <MortgageState />
    </div>
  );
}
