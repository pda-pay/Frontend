import { useEffect, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import paymentAPI from "../../api/paymentAPI";
import NormalTitle from "../../components/text/NormalTitle";
import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import ButtonBar from "../../components/button/ButtonBar";

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

  const [inputValue, setInputValue] = useState<string>("");
  const [errInput, setErrInput] = useState<boolean>(true);
  const [repayAmount, setRepayAmount] = useState<number>(0);

  const [repaymentDate, setRepaymentDate] = useState<number>(1);
  const [previousMonthDebt, setPreviousMonthDebt] = useState<number>(0);
  const [currentMonthDebt, setCurrentMonthDebt] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
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
    if (today.getMonth() !== 1) {
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
    ]
  ) => {
    mortgagedStock.forEach((rowA) => {
      // 우선 배열에 일치하는 행이 있는지 검사
      const isMatch = sellStock.some(
        (rowB) =>
          rowA[1] === rowB[1] && rowA[2] === rowB[2] && rowA[3] === rowB[3]
      );

      if (!isMatch) setSellStock((prevState) => [...prevState, row]);
    });
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
    if (ip > sellStockPrice /* || ip > totalDebt */ || ip <= 0) {
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
                  <tr onClick={() => selectSellStock(stock)}>
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
        <NormalTitle>결제 예정 금액</NormalTitle>
        <BackgroundFrame color="blue">
          <div>{totalDebt.toLocaleString()}원</div>
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
      <div>
        <NormalTitle>
          결제 가능 금액: {sellStockPrice.toLocaleString()}원
        </NormalTitle>
        <label className="block">
          {/* <span className="text-sm text-gray-400">
            최대 {accountMoney.toLocaleString()}원 입력 가능합니다.
          </span> */}
          <input
            type="number"
            name="repay"
            value={inputValue}
            onChange={handleTempSelected}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
          {errInput && inputValue.length > 0 && (
            <p className="mt-2 text-sm text-red-600">
              {"계좌 잔액 이하의 금액을 입력해주세요."}
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
          //nextOnClick={postCashRepayAmount}
        />
      </div>
    </PaddingDiv>
  );
}
