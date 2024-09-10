import { useEffect, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import paymentAPI from "../../api/paymentAPI";
import axios from "axios";
import BoldTitle from "../../components/text/BoldTitle";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import XButton from "../../components/button/XButton";
import { PiNoteLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import NormalTitle from "../../components/text/NormalTitle";

type HistoryObject = {
  id: number;
  paymentAmount: number;
  createdAt: string;
  franchiseName: string;
};

export default function PaymentHistoryPage() {
  const paymentservice = new paymentAPI();
  const navigate = useNavigate();

  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>((today.getMonth() + 1) % 12);

  //선택한 날짜
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    (today.getMonth() + 1) % 12
  );

  useEffect(() => {
    setYear(today.getFullYear());
    setMonth((today.getMonth() + 1) % 12);
  }, []);

  //결제 아이디, 결제 금액, 결제일, 가게명
  const [paymentHistory, setPaymentHistory] = useState<
    [number, number, string, string][]
  >([]);

  const getHistory = async () => {
    try {
      const response = await paymentservice.getPaymentHistory(
        selectedYear,
        selectedMonth
      );
      if (response.status === 200) {
        const data = response.data;
        saveHistory(data.paymentHistories);
      } else if (response.status === 204) {
        setPaymentHistory([]);
        console.log("결제내역없음");
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
  }, [selectedMonth, selectedYear]);

  const moveLeftMoveButton = () => {
    console.log("눌림");
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const moveRightMoveButton = () => {
    console.log("눌림");
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  return (
    <PaddingDiv>
      <div>
        <div className="flex flex-row-reverse">
          <span
            onClick={() => {
              navigate(-1);
            }}
          >
            <XButton />
          </span>
        </div>

        <BoldTitle>결제 내역</BoldTitle>
      </div>
      <div>
        <BoldTitle>
          <div className="flex items-center">
            <span className="mr-auto" onClick={() => moveLeftMoveButton()}>
              <IoChevronBackOutline />
            </span>
            {selectedYear}년 {selectedMonth}월
            {selectedMonth === month && selectedYear === year ? (
              <span className="ml-auto mr-5"></span>
            ) : (
              <span className="ml-auto" onClick={() => moveRightMoveButton()}>
                <IoChevronForwardOutline />
              </span>
            )}
          </div>
        </BoldTitle>
      </div>
      {paymentHistory.length !== 0 ? (
        <div>
          {paymentHistory.map((history) => (
            <div className="flex justify-between items-center mt-5">
              <div className="flex flex-col ">
                <div>{history[3]}</div>
                <div className="text-sm text-gray-400">
                  {history[2].replace("T", " ")}
                </div>
              </div>
              <div className="font-bold ml-auto">
                {history[1].toLocaleString()}원
              </div>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-[60px]">
          <PiNoteLight size="80px" color="#363e57" />
          <NormalTitle>결제 내역이 없습니다.</NormalTitle>
        </div>
      )}
    </PaddingDiv>
  );
}
