import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonBar from "../../components/button/ButtonBar";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";

export default function SelectedStockPage() {
  //const navigate = useNavigate();
  const location = useLocation();

  const { selectedStock } = location.state as {
    selectedStock: [string, string, number, number, number][];
  };

  const [updatedStock, setUpdatedStock] =
    useState<[string, string, number, number, number][]>(selectedStock);

  useEffect(() => {
    console.log(selectedStock);
  }, [selectedStock]);

  const [nowLimit, setNowLimit] = useState<number>(() => {
    let totalLimit = 0;
    for (let i = 0; i < selectedStock.length; i++) {
      if (selectedStock[i][2] != 0) {
        totalLimit += selectedStock[i][4] * selectedStock[i][2];
      }
    }
    return totalLimit;
  });

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
        <NormalTitle>선택한 주식</NormalTitle>
        <BackgroundFrame color="blue">
          <div>여기 선택한 주식</div>
        </BackgroundFrame>
        <NormalTitle>선택 안 한 주식</NormalTitle>
        <BackgroundFrame color="blue">
          <div>여기 선택 안한 주식</div>
        </BackgroundFrame>
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
