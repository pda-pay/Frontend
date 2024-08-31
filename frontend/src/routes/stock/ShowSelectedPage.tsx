import { useState, useEffect } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import StockFrame from "./component/StockFrame";
import SelectedStockButtonbar from "./component/SelectedStockButtonbar";

interface StockProps {
  selectedStock: [
    string,
    string,
    string,
    string,
    number,
    number,
    number,
    number,
    string
  ][];
  handleSelectedStock: (index: number, amount: number) => void;
  handlePage: (p: number) => void;
}

export default function ShowSelectedPage({
  selectedStock,
  handleSelectedStock,
  handlePage,
}: StockProps) {
  const [temp, setTemp] = useState<
    [string, string, string, string, number, number, number, number, string][]
  >([...selectedStock]);

  const handleTemp = (index: number, amount: number) => {
    const newRow: [
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number,
      string
    ] = [
      temp[index][0],
      temp[index][1],
      temp[index][2],
      temp[index][3],
      temp[index][4],
      amount,
      temp[index][6],
      temp[index][7],
      temp[index][8],
    ];

    const t: [
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number,
      string
    ][] = [...temp.slice(0, index), newRow, ...temp.slice(index + 1)];
    setTemp(t);
  };

  useEffect(() => {
    console.log("temp is " + temp);
  }, [temp]);

  const clickFinishButton = () => {
    for (let i = 0; i < temp.length; i++) {
      console.log("click finish button: " + i + "is " + temp[i][5]);
      handleSelectedStock(i, temp[i][5]);
    }
  };

  const [limit, setLimit] = useState<number>(0);
  const calculateLimit = () => {
    let totalLimit = 0;
    for (let i = 0; i < temp.length; i++) {
      totalLimit += temp[i][5] * temp[i][7];
    }
    return totalLimit;
  };
  useEffect(() => {
    setLimit(calculateLimit);
  }, [temp]);

  return (
    <PaddingDiv>
      <NormalTitle>
        현재 확보한 총 한도는
        <span className="font-bold text-blue-700"> {limit}원</span> 입니다.
        <div className="text-sm	text-gray-400">
          각 종목을 클릭하면 선택할 주수 조절이 가능합니다.
        </div>
      </NormalTitle>

      <div className="flex flex-col">
        <div>
          <StockFrame stocks={temp} handleTemp={handleTemp} />
        </div>
      </div>
      <SelectedStockButtonbar
        handlePage={handlePage}
        clickFinishButton={clickFinishButton}
      />
    </PaddingDiv>
  );
}
