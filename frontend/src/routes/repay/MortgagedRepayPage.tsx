import { useEffect, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import paymentAPI from "../../api/paymentAPI";
import NormalTitle from "../../components/text/NormalTitle";
import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import ButtonBar from "../../components/button/ButtonBar";
import SellStockModal from "./component/SellStockModal";
import AlertRepayModal from "./component/AlertRepayModal";

type MortgagedObject = {
  stockRank: number;
  accountNumber: string;
  quantity: number;
  stockCode: string;
  stockName: string;
  companyCode: string;
  companyName: string;
  stabilityLevel: number;
  presentValue: number;
  limitPrice: number;
  percent: number;
};

export default function MortgagedRepayPage() {
  const repayservice = new paymentAPI();

  const today = new Date();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clickedRow, setClickedRow] = useState<
    [
      number,
      string,
      number,
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number
    ]
  >([0, "", 0, "", "", "", "", 0, 0, 0, 0]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);

  const [repayResult, setRepayResult] = useState<{
    repaymentAmount: number;
    totalSellAmount: number;
    realRepaymentAmount: number;
    amountToAccount: number;
    message: string;
  }>({
    repaymentAmount: 0,
    totalSellAmount: 0,
    realRepaymentAmount: 0,
    amountToAccount: 0,
    message: "string",
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [errInput, setErrInput] = useState<boolean>(true);
  const [repayAmount, setRepayAmount] = useState<number>(0);

  const [repaymentDate, setRepaymentDate] = useState<number>(1);
  const [previousMonthDebt, setPreviousMonthDebt] = useState<number>(0);
  const [currentMonthDebt, setCurrentMonthDebt] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<number>(
    (today.getMonth() + 1) % 12
  );
  const [previousMonth, setPreviousMonth] = useState<number>(0);
  const [totalDebt, setTotalDebt] = useState<number>(0);

  //length: 11
  //0: 우선순위, 1: 계좌번호, 2: 수량, 3: 종목코드, 4: 종목명, 5: 증권사코드, 6: 증권사명
  //7: 위험도, 8: 전일종가, 9: 한도, 10: 퍼센트
  const [mortgagedStock, setMortgagedStock] = useState<
    [
      number,
      string,
      number,
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number
    ][]
  >([]);

  const [sellStock, setSellStock] = useState<
    [
      number,
      string,
      number,
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number
    ][]
  >([]);
  const [sellStockPrice, setSellStockPrice] = useState<number>(0);

  useEffect(() => {
    if (currentMonth !== 1) {
      setPreviousMonth(currentMonth - 1);
    } else setPreviousMonth(12);
  }, []);

  const getRepayAmount = async () => {
    try {
      const response = await repayservice.getRepayAmount();

      if (response.status === 200) {
        setRepaymentDate(response.data.repaymentDate);
        setPreviousMonthDebt(response.data.previousMonthDebt);
        setCurrentMonthDebt(response.data.currentMonthDebt);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRepayAmount();
  }, []);

  const getMortgagedStock = async () => {
    try {
      const response = await repayservice.getMortgagedStock();

      if (response.status === 200) {
        saveMortgagedStock(response.data.stockPriorities);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postMortgagedRepay = async (): Promise<boolean> => {
    const temp = {
      repaymentAmount: repayAmount,
      selectedStocks: sellStock.map((stock) => ({
        stockRank: stock[0],
        quantity: stock[2],
        accountNumber: stock[1],
        stockCode: stock[3],
      })),
    };

    try {
      const response = await repayservice.postMortgagedRepay(temp);

      if (response.status === 200) {
        console.log(response.data);
        setRepayResult(response.data);

        openAlert();
        //알람창을 확인해야 페이지가 넘어가도록 페이지 이동 막음
        return false;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    getMortgagedStock();
  }, []);

  const saveMortgagedStock = (data: MortgagedObject[]) => {
    const temp: [
      number,
      string,
      number,
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number
    ][] = data.map((item) => [
      item.stockRank,
      item.accountNumber,
      item.quantity,
      item.stockCode,
      item.stockName,
      item.companyCode,
      item.companyName,
      item.stabilityLevel,
      item.presentValue,
      item.limitPrice,
      item.percent,
    ]);

    setMortgagedStock([...temp]);
  };

  const selectSellStock = (
    row: [
      number,
      string,
      number,
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number
    ],
    value: number
  ) => {
    const isMatch = sellStock.some(
      (rowB) => row[1] === rowB[1] && row[3] === rowB[3] && row[5] === rowB[5]
    );

    if (!isMatch)
      setSellStock((prevState) => [
        ...prevState,
        [
          row[0],
          row[1],
          value,
          row[3],
          row[4],
          row[5],
          row[6],
          row[7],
          row[8],
          row[9],
          row[10],
        ],
      ]);
    else {
      const updatedSellStock: [
        number,
        string,
        number,
        string,
        string,
        string,
        string,
        number,
        number,
        number,
        number
      ][] = sellStock.map((rowB) =>
        row[1] === rowB[1] && row[5] === rowB[5] && row[3] === rowB[3]
          ? [
              row[0],
              row[1],
              value,
              row[3],
              row[4],
              row[5],
              row[6],
              row[7],
              row[8],
              row[9],
              row[10],
            ]
          : rowB
      );
      setSellStock(updatedSellStock);
    }
  };

  const deleteSellStock = (rowIndex: number) => {
    console.log("삭제");
    setSellStock((prevState) =>
      prevState.filter((_, index) => index !== rowIndex)
    );
  };

  useEffect(() => {
    setTotalDebt(previousMonthDebt + currentMonthDebt);
  }, [previousMonthDebt, currentMonthDebt]);

  useEffect(() => {
    let limit = 0;
    sellStock.map((row) => {
      limit += row[2] * row[8];
    });
    setSellStockPrice(limit);
  }, [sellStock]);

  const validateInput = (ip: number) => {
    if (ip > sellStockPrice || ip > totalDebt || ip <= 0) {
      setErrInput(true);
    } else {
      setRepayAmount(ip);
      setErrInput(false);
    }
  };

  const handleTempSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const valueToNum = Number(value);

    if (value === "" || !isNaN(Number(value))) {
      setInputValue(value);
      validateInput(valueToNum);
    }
  };

  return (
    <PaddingDiv>
      <BoldTitle>담보주식으로 상환 하기</BoldTitle>
      <div>
        <NormalTitle>매도할 종목을 클릭하고 주수를 선택해주세요.</NormalTitle>
        <BackgroundFrame color="blue">
          <div className="text-xs">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th>증권사명</th>
                  <th>종목명</th>
                  <th>선택 주수</th>
                  <th>전일 종가</th>
                  {/* <th>등급</th> */}
                  <th>가능 한도</th>
                </tr>
              </thead>
              <tbody>
                {mortgagedStock.map((stock) => (
                  <tr
                    onClick={() => {
                      setClickedRow([...stock]);
                      openModal(); /*selectSellStock(stock)*/
                    }}
                  >
                    <td>{stock[6]}</td>
                    <td>{stock[4]}</td>
                    <td>{stock[2]}</td>
                    <td>{stock[8].toLocaleString()}</td>
                    {/* <td>{stock[7]}</td> */}
                    <td>{stock[9].toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BackgroundFrame>
      </div>

      <div>
        <NormalTitle>선택한 주식</NormalTitle>
        <BackgroundFrame color="blue">
          <div className="text-xs">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th>증권사명</th>
                  <th>종목명</th>
                  <th>선택 주수</th>
                  <th>전일 종가</th>
                  {/* <th>등급</th> */}
                  <th>가능 한도</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {sellStock.map((stock, index) => (
                  <tr>
                    <td>{stock[6]}</td>
                    <td>{stock[4]}</td>
                    <td>{stock[2]}</td>
                    <td>{stock[8].toLocaleString()}</td>
                    {/* <td>{stock[7]}</td> */}
                    <td>{stock[9].toLocaleString()}</td>
                    <td onClick={() => deleteSellStock(index)}>-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BackgroundFrame>
      </div>
      <div>
        <BackgroundFrame color="blue">
          <div>결제 예정 금액: {totalDebt.toLocaleString()}원</div>
          <div>결제 예정일: 매월 {repaymentDate}일</div>
          <div>
            {previousMonth === 12 ? (
              <span>{today.getFullYear() - 1}</span>
            ) : (
              <span>{today.getFullYear()}</span>
            )}
            년 {previousMonth}월 결제 {previousMonthDebt.toLocaleString()}원
          </div>
          <div>
            {today.getFullYear()}년 {currentMonth}월 결제{" "}
            {currentMonthDebt.toLocaleString()}원
          </div>
        </BackgroundFrame>
      </div>
      <NormalTitle>
        <div className="flex">
          <div>결제 가능 금액:</div>
          <span className="ml-auto">{sellStockPrice.toLocaleString()}원</span>
        </div>
      </NormalTitle>
      <div>
        <label className="block">
          <NormalTitle>결제할 금액을 입력하세요.</NormalTitle>
          <input
            type="number"
            name="repay"
            value={inputValue}
            onChange={handleTempSelected}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
          {errInput && inputValue.length > 0 && (
            <p className="mt-2 text-sm text-red-600">
              {"결제 예정액, 결제 가능액 이하의 금액을 입력해주세요."}
            </p>
          )}
        </label>
      </div>

      <div className="mt-auto">
        <ButtonBar
          beforetext="취소"
          beforeurl="/payment"
          nexttext="상환하기"
          nexturl="/payment"
          nextdisabled={errInput}
          nextOnClick={postMortgagedRepay}
        />
      </div>
      {isAlertOpen && (
        <AlertRepayModal
          isAlertOpen={isAlertOpen}
          handleCloseAlert={closeAlert}
          result={repayResult}
        />
      )}
      {isModalOpen && (
        <SellStockModal
          isModalOpen={isModalOpen}
          handleCloseModal={closeModal}
          clickedRow={clickedRow}
          selectSellStock={selectSellStock}
        />
      )}
    </PaddingDiv>
  );
}
