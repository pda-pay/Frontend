import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonBar from "../../components/button/ButtonBar";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import StockGroup from "./component/stockGroup";

export default function SelectedStockPage() {
  const location = useLocation();

  const { selectedStock } = location.state as {
    selectedStock: [string, string, number, number, number][];
  };

  useEffect(() => {
    console.log(selectedStock);
  }, [selectedStock]);

  const [updatedStock, setUpdatedStock] =
    useState<[string, string, number, number, number][]>(selectedStock);

  const [nowLimit, setNowLimit] = useState<number>(() => {
    let totalLimit = 0;
    for (let i = 0; i < selectedStock.length; i++) {
      if (selectedStock[i][2] != 0) {
        totalLimit += selectedStock[i][4] * selectedStock[i][2];
      }
    }
    return totalLimit;
  });

  const [pick, setPick] = useState<
    [number, string, string, number, number, number][] | undefined
  >(undefined);
  const [unPick, setUnPick] = useState<
    [number, string, string, number, number, number][] | undefined
  >(undefined);

  const updatePicks = () => {
    for (let i = 0; i < updatedStock.length; i++) {
      const now = updatedStock[i];
      const temp: [number, string, string, number, number, number] = [
        i,
        ...now,
      ];

      if (now[2] !== 0) {
        setPick((prevPick) => {
          return prevPick !== undefined ? [...prevPick, temp] : [temp];
        });
      } else {
        setUnPick((prevUnPick) => {
          return prevUnPick !== undefined ? [...prevUnPick, temp] : [temp];
        });
      }
    }
  };

  useEffect(() => {
    updatePicks();
    console.log("update!");
  }, []);

  useEffect(() => {
    console.log("pick is" + pick);
  }, [pick]);

  return (
    <PaddingDiv>
      <NormalTitle>
        현재 확보한 총 한도는
        <span className="font-bold text-blue-700"> {nowLimit}원</span> 입니다.
        <div className="text-sm	text-gray-400">
          종목을 클릭하면 수정 또는 삭제가 가능합니다.
        </div>
      </NormalTitle>
      <div className="flex flex-col">
        <div>
          <NormalTitle>선택한 주식</NormalTitle>
          <StockGroup stockList={pick} />
        </div>
        <div>
          <NormalTitle>선택 안 한 주식</NormalTitle>
          <StockGroup stockList={unPick} />
        </div>
      </div>
      <ButtonBar
        beforetext="이전"
        nexttext="완료"
        beforeurl="/stockcheck"
        beforestate={{ gotStock: selectedStock }}
        nexturl="/priority"
        nextstate={{ updatedStock: updatedStock }}
      />
    </PaddingDiv>
  );
}
