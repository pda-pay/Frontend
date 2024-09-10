import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import repaymentAPI from "../../api/repaymentAPI";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import XButton from "../../components/button/XButton";
import BoldTitle from "../../components/text/BoldTitle";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { PiNoteLight } from "react-icons/pi";
import NormalTitle from "../../components/text/NormalTitle";

type HistoryObject = {
  repaymentAmount: number;
  createdAt: string;
  type: string;
};

export default function RepaymentHistoryPage() {
  const repaymentservice = new repaymentAPI();
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

  // 상환 금액, 상환 시간, 상환 타입
  const [repaymentHistory, setRepaymentHistory] = useState<
    [number, string, string][]
  >([]);

  const getHistory = async () => {
    try {
      const response = await repaymentservice.getRepaymentHistory(
        selectedYear,
        selectedMonth
      );
      if (response.status === 200) {
        const data = response.data;
        saveHistory(data.repaymentHistories);
      } else if (response.status === 204) {
        setRepaymentHistory([]);
        console.log("상환 내역 없음");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400 || error.response?.status === 403) {
          console.log("상환 내역 에러: " + error.response.data.message);
        }
      }
      console.log("상환 내역 에러 발생: " + error);
    }
  };

  const saveHistory = (data: HistoryObject[]) => {
    const temp: [number, string, string][] = data.map((item) => [
      item.repaymentAmount,
      item.createdAt,
      item.type,
    ]);
    setRepaymentHistory([...temp]);
  };

  useEffect(() => {
    getHistory();
  }, [selectedMonth, selectedYear]);

  const moveLeftMoveButton = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const moveRightMoveButton = () => {
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
          <span onClick={() => navigate(-1)}>
            <XButton />
          </span>
        </div>
        <BoldTitle>상환 내역</BoldTitle>
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
      {repaymentHistory.length !== 0 ? (
        <div>
          {repaymentHistory.map((history) => (
            <div className="flex justify-between items-center mt-5">
              <div className="flex flex-col">
                <div>{history[2]}</div>
                <div className="text-sm text-gray-400">
                  {history[1].replace("T", " ")}
                </div>
              </div>
              <div className="font-bold ml-auto">
                {history[0].toLocaleString()}원
              </div>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-[60px]">
          <PiNoteLight size="80px" color="#363e57" />
          <NormalTitle>상환 내역이 없습니다.</NormalTitle>
        </div>
      )}
    </PaddingDiv>
  );
}
