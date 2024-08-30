import { useState } from "react";
import { useLocation } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import ButtonBar from "../../components/button/ButtonBar";
import { IoAddCircle } from "react-icons/io5";

export default function PriorityPage() {
  const location = useLocation();

  const { selectedStock } = location.state as {
    selectedStock: [string, string, number, number, number][];
  };

  const { stocks } = location.state as {
    stocks: [string, string, number, number, number][];
  };

  let nowLimit: number = 0;
  for (let i = 0; i < selectedStock.length; i++) {
    if (selectedStock[i][2] != 0) {
      nowLimit += selectedStock[i][4] * selectedStock[i][2];
    }
  }

  return (
    <PaddingDiv>
      <div>
        <NormalTitle>
          현재 확보한 총 한도는
          <span className="font-bold text-blue-700"> {nowLimit}원</span> 입니다.
        </NormalTitle>
        <div className="text-sm	text-gray-400">
          + 버튼을 통해 반대매매 시 우선으로 처리할 증권을 추가해보세요.
        </div>
        <div className="flex justify-center">
          <IoAddCircle className="size-32 text-gray-400" />
        </div>
      </div>

      <div>{selectedStock}</div>

      <ButtonBar
        beforetext="이전"
        nexttext="다음"
        beforeurl="/stockcheck"
        beforestate={{ priorityToCheck: selectedStock }}
        nexturl="/limit"
        nextstate={{ stocks: stocks }}
      />
    </PaddingDiv>
  );
}
