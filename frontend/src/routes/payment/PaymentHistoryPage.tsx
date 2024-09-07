import { useEffect, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import paymentAPI from "../../api/paymentAPI";
import axios from "axios";
import BoldTitle from "../../components/text/BoldTitle";

type HistoryObject = {
  id: number;
  paymentAmount: number;
  createdAt: string;
  franchiseName: string;
};

export default function PaymentHistoryPage() {
  const paymentservice = new paymentAPI();

  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth());

  //결제 아이디, 결제 금액, 결제일, 가게명
  const [paymentHistory, setPaymentHistory] = useState<
    [number, number, string, string][]
  >([]);

  const getHistory = async () => {
    try {
      const response = await paymentservice.getPaymentHistory(year, month);
      if (response.status === 200 || response.status === 204) {
        const data = response.data;
        saveHistory(data.paymentHistories);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400 || error.response?.status === 403) {
          console.log("결제내역 에러: " + error.response.data.message);
        }
      }
      console.log("결제 내역 에러 발생: " + error);
    }
  };

  const saveHistory = (data: HistoryObject[]) => {
    const temp: [number, number, string, string][] = data.map((item) => [
      item.id,
      item.paymentAmount,
      item.createdAt,
      item.franchiseName,
    ]);
    setPaymentHistory([...temp]);
  };

  useEffect(() => {
    getHistory();
  }, [month]);

  return (
    <PaddingDiv>
      <div>
        <NormalTitle>결제 내역</NormalTitle>
      </div>
      <div>
        <BoldTitle>
          {year}년 {month}월
        </BoldTitle>
      </div>
      <div>
        {paymentHistory.map((history) => (
          <div className="flex justify-between items-center mt-5">
            <div className="flex flex-col">
              <div className="">{history[3]}</div>
              <div className="text-sm text-gray-400">
                {history[2].split("T")}
              </div>
            </div>
            <div className="font-bold">{history[1].toLocaleString()}원</div>
            <hr />
          </div>
        ))}
      </div>
    </PaddingDiv>
  );
}
