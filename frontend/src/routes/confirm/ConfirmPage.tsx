import { useState, useEffect } from "react";
import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import ConfirmModal from "./component/ConfirmModal";
import ButtonBar from "../../components/button/ButtonBar";
import NormalTitle from "../../components/text/NormalTitle";
import payServiceAPI from "../../api/payServiceAPI";
import userAPI from "../../api/userAPI";
import axios from "axios";

type MortgagedObject = {
  accountNumber: string;
  quantity: number;
  stockCode: string;
  stockName: string;
  companyCode: string;
  companyName: string;
  stabilityLevel: number;
  stockPrice: number;
  limitPrice: number;
};

type PriorityObject = {
  accountNumber: string;
  quantity: number;
  stockCode: string;
  stockName: string;
  stockRank: number;
  companyCode: string;
  companyName: string;
  stabilityLevel: number;
  stockPrice: number;
  limitPrice: number;
};

export default function ConfirmPage() {
  const payjoinservice = new payServiceAPI();
  const userinfosevice = new userAPI();

  const [userInfo, setUserInfo] = useState<[string, boolean, boolean]>([
    "이름",
    false,
    false,
  ]);

  const [account, setAccount] = useState<string[]>([]);
  const [payDate, setPayDate] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [stocks, setStocks] = useState<
    [string, number, string, string, string, string, number, number, number][]
  >([]);
  const [priStocks, setPriStocks] = useState<
    [
      string,
      number,
      string,
      string,
      number,
      string,
      string,
      number,
      number,
      number
    ][]
  >([]);

  const getUserInfo = async () => {
    try {
      const response = await userinfosevice.checkMem();

      if (response.status === 200) {
        const temp: [string, boolean, boolean] = [
          response.data.userId,
          response.data.paymentServiceMember,
          userInfo[2],
        ];
        setUserInfo([...temp]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log("에러 발생");
        }
      }
      console.log(error);
    }
  };

  const getFinalInfo = async () => {
    try {
      const response = await payjoinservice.getFinalInfo();

      if (response.status === 200) {
        const repaymentAccount = response.data.repaymentAccount;
        setAccount([
          repaymentAccount.companyName,
          repaymentAccount.accountNumber,
          repaymentAccount.companyCode,
          repaymentAccount.category,
        ]);
        setPayDate(response.data.repaymentDate);
        setLimit(response.data.currentLimit);
        const mortgagedStocks = response.data.mortgagedStocks;
        saveMortgagedStock(mortgagedStocks);
        const stockPriorities = response.data.stockPriorities;
        savePriorityStock(stockPriorities);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400)
          console.log("최종 컨펌 에러 발생: " + error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    getFinalInfo();
  }, []);

  const saveMortgagedStock = (data: MortgagedObject[]) => {
    const temp: [
      string,
      number,
      string,
      string,
      string,
      string,
      number,
      number,
      number
    ][] = data.map((item) => [
      item.accountNumber,
      item.quantity,
      item.stockCode,
      item.stockName,
      item.companyCode,
      item.companyName,
      item.stabilityLevel,
      item.stockPrice,
      item.limitPrice,
    ]);
    setStocks([...temp]);
  };

  const savePriorityStock = (data: PriorityObject[]) => {
    const temp: [
      string,
      number,
      string,
      string,
      number,
      string,
      string,
      number,
      number,
      number
    ][] = data.map((item) => [
      item.accountNumber,
      item.quantity,
      item.stockCode,
      item.stockName,
      item.stockRank,
      item.companyCode,
      item.companyName,
      item.stabilityLevel,
      item.stockPrice,
      item.limitPrice,
    ]);
    setPriStocks([...temp]);
  };

  const threeStocks = stocks.slice(0, 3);

  useEffect(() => {
    // 배열을 첫 번째 열 기준으로 오름차순 정렬
    const sortedArr = [...priStocks].sort((a, b) => a[4] - b[4]);
    setPriStocks([...sortedArr]);
  }, []);

  // 상위 5개의 값을 저장할 state
  const fivePriStocks = priStocks.slice(0, 5);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //0이면 담보 모달, 1이면 우선 순위 모달
  const [modalNum, setModalNum] = useState<number>();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMortgageModal = () => {
    setModalNum(0);
    openModal();
  };

  const handlePriorityModal = () => {
    setModalNum(1);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <PaddingDiv>
      <NormalTitle>
        <span className="font-bold">{userInfo[0]}님,</span> 결제 서비스 설정을
        확인해주세요.
      </NormalTitle>
      <div>
        <BackgroundFrame color="blue">
          <div className="flex flex-col gap-1 my-3">
            <div className="flex flex-col gap-2">
              <div>
                결제 계좌: {account[0]} {account[1]}
              </div>
              <div>결제일: 매월 {payDate}일</div>
            </div>
          </div>
        </BackgroundFrame>
      </div>
      <div className="flex flex-col gap-5">
        <BackgroundFrame color="blue">
          <div className="flex flex-col gap-3 my-3">
            <BoldTitle>설정한 한도: {limit.toLocaleString()}원</BoldTitle>
            <div>
              <div className="flex justify-between mb-3">
                <BoldTitle>선택한 종목</BoldTitle>
                <span className="text-gray-400" onClick={handleMortgageModal}>
                  자세히 보기
                </span>
              </div>

              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                {threeStocks.map((stock) => (
                  <li>
                    [{stock[5]}] {stock[3]} {stock[1]}주
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </BackgroundFrame>
        <BackgroundFrame color="blue">
          <div className="flex flex-col gap-3 my-3">
            <div className="flex justify-between">
              <BoldTitle>매도 우선순위</BoldTitle>
              <span className="text-gray-400" onClick={handlePriorityModal}>
                자세히 보기
              </span>
            </div>

            <ul
              style={
                {
                  /*paddingLeft: "20px" */
                }
              }
            >
              {fivePriStocks.map((stock) => (
                <li>
                  {stock[4]}순위. [{stock[6]}] {stock[3]} {stock[1]}주
                </li>
              ))}
            </ul>
          </div>
        </BackgroundFrame>
      </div>

      {isModalOpen &&
        (modalNum === 0 ? (
          <ConfirmModal
            mortgage={stocks}
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <ConfirmModal
            priority={priStocks}
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
          />
        ))}

      <div className="mt-auto">
        <ButtonBar
          beforetext="이전"
          nexttext="다음"
          beforeurl="/paymentdate"
          nexturl="/simple"
        ></ButtonBar>
      </div>
    </PaddingDiv>
  );
}
