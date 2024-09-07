import { useEffect, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import paymentAPI from "../../api/paymentAPI";
import axios from "axios";
import BoldTitle from "../../components/text/BoldTitle";

export default function PaymentHistoryPage() {
  const paymentservice = new paymentAPI();
  //결제 아이디, 결제 금액, 결제일, 가게명
  const [paymentHistory, setPaymentHistory] = useState<
    [number, number, string, string][]
  >([
    [3, 1000000, "2024-08-30T00:00:00", "테슬라"],
    [4, 2000, "2024-08-30T00:00:00", "테슬라"],
    [5, 10000000, "2024-08-30T00:00:00", "테슬라"],
  ]);
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  //api 요청을 통해 결제 내역 받아오기
  const getHistory = async () => {
    try {
      const response = await paymentservice.getPaymentHistory(month);
      if (response.status === 200 || response.status === 204) {
        const data = response.data.paymentHistories;
        setPaymentHistory([...data]);
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

  //밑줄 지우기 위함. 없애기.
  useEffect(() => {
    setYear(0);
    setMonth(0);
  }, []);
  useEffect(() => {
    getHistory();
  }, [month]);

  return (
    <PaddingDiv>
      <div className="place-items-center">
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
