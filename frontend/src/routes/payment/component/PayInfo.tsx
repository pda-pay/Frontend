import { useEffect, useState } from "react";
import axios from "axios";
import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import paymentAPI from "../../../api/paymentAPI";
import BoldTitle from "../../../components/text/BoldTitle";
import NormalTitle from "../../../components/text/NormalTitle";
import { useNavigate } from "react-router-dom";

export default function PayInfo() {
  const navigate = useNavigate();
  const paymentservice = new paymentAPI();

  const [paymentAccount, setPaymentAccount] = useState<number>(1000000);
  const [creditLimit, setCreditLimit] = useState<number>(500000);
  const [accountDeposit, setAccountDeposit] = useState<number>(1000000);
  //결제 번호, 결제 금액, 날짜, 가게
  const [paymentHistory, setPaymentHistory] = useState<
    [number, number, string, string][]
  >([
    [0, 4000, "2024-09-02T00:00:00", "씨유"],
    [1, 10000, "2024-08-30T00:00:00", "성수갈비 성수점"],
  ]);

  const [errMsg, setErrMsg] =
    useState<string>("결제 내역을 가져올 수 없습니다.");

  //TODO: 여기서 api 호출해서 내역 가져오기
  const updatePaymentInfo = async () => {
    try {
      const response = await paymentservice.getPaymentInfo();
      if (response.status === 200) {
        const data = response.data;
        setPaymentAccount(data.paymentAccount);
        setCreditLimit(data.creditLimit);
        setAccountDeposit(data.accountDeposit);
        setPaymentHistory([...data.paymentHistory]);
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

  useEffect(() => {
    updatePaymentInfo();
  }, []);

  return (
    <BackgroundFrame color="white">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div>
            <BoldTitle>
              결제할 금액: {paymentAccount.toLocaleString()}원
            </BoldTitle>
            <div className="text-gray-400">여기 오늘 날짜</div>
          </div>
          <div className="text-gray-500">
            <div>한도: {creditLimit.toLocaleString()}원</div>
            <div>연결계좌 잔액: {accountDeposit.toLocaleString()}</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <BoldTitle>최근 이용 내역</BoldTitle>{" "}
            <span
              className="text-gray-400"
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
                  <div>{history[2].split("T")}</div>
                </div>
                <div>{history[1].toLocaleString()}원</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BackgroundFrame>
  );
}
