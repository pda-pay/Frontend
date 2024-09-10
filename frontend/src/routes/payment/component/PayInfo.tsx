import { useEffect, useState } from "react";
import axios from "axios";
import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import paymentAPI from "../../../api/paymentAPI";
import BoldTitle from "../../../components/text/BoldTitle";
import NormalTitle from "../../../components/text/NormalTitle";
import { useNavigate } from "react-router-dom";
import ServiceBlockFrame from "../../../components/backgroundframe/ServiceBlockFrame";

interface UserProps {
  member: boolean;
}

type HistoryObject = {
  id: number;
  paymentAmount: number;
  createdAt: string;
  franchiseName: string;
};

export default function PayInfo({ member }: UserProps) {
  const navigate = useNavigate();
  const paymentservice = new paymentAPI();

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [creditLimit, setCreditLimit] = useState<number>(500000);
  const [remainCreditLimit, setRemainCreditLimit] = useState<number>(1000000);
  //결제 번호, 결제 금액, 날짜, 가게
  const [paymentHistory, setPaymentHistory] = useState<
    [number, number, string, string][]
  >([]);

  const [errMsg, setErrMsg] =
    useState<string>("결제 내역을 가져올 수 없습니다.");

  //TODO: 여기서 api 호출해서 내역 가져오기
  const updatePaymentInfo = async () => {
    try {
      const response = await paymentservice.getPaymentInfo();
      if (response.status === 200) {
        const data = response.data;
        setPaymentAmount(data.paymentAmount);
        setCreditLimit(data.creditLimit);
        setRemainCreditLimit(data.remainCreditLimit);
        saveHistory(data.paymentHistories);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          if (error.response.data.message)
            setErrMsg(error.response.data.message);
          console.log(errMsg);
        }
        console.log("결제 페이지 에러 발생: " + error);
      }
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
    updatePaymentInfo();
  }, []);

  return (
    <div className="relative cursor-default">
      <BackgroundFrame color="white">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div>
              <BoldTitle>
                결제할 금액: {paymentAmount.toLocaleString()}원
              </BoldTitle>
              <div className="text-gray-400 text-sm">{formattedDate} 기준</div>
            </div>
            <div className="text-gray-500">
              <div>한도: {creditLimit.toLocaleString()}원</div>
              <div>남은 한도: {remainCreditLimit.toLocaleString()}원</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <BoldTitle>최근 이용 내역</BoldTitle>
              <span
                className="text-gray-400 cursor-pointer"
                onClick={() => navigate("/paymenthistory")}
              >
                더보기
              </span>
            </div>
            <div>
              {paymentHistory.map((history) => (
                <div className="flex justify-between items-center">
                  <div>
                    <NormalTitle>{history[3]}</NormalTitle>
                    <div>{history[2].replace("T", " ")}</div>
                  </div>
                  <div>{history[1]}원</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BackgroundFrame>

      {!member && (
        <div
          className="absolute inset-0  opacity-50"
          onClick={() => navigate("/serviceagree")}
        >
          <ServiceBlockFrame> </ServiceBlockFrame>
        </div>
      )}
    </div>
  );
}
