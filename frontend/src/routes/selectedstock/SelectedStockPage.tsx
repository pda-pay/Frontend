import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonBar from "../../components/button/ButtonBar";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";

export default function SelectedStockPage() {
  //const navigate = useNavigate();
  const location = useLocation();

  const { selectedStock } = location.state as {
    selectedStock: [string, string, number, number, number][];
  };
  const [gotStock, setGotStock] =
    useState<[string, string, number, number, number][]>(selectedStock);

  const [updatedStock, setUpdatedStock] =
    useState<[string, string, number, number, number][]>(selectedStock);

  return (
    <PaddingDiv>
      <NormalTitle>
        현재 확보한 총 한도는{" "}
        <span className="font-bold text-blue-700">1000000원</span> 입니다.
      </NormalTitle>
      <ButtonBar
        beforetext="이전"
        nexttext="완료"
        beforeurl="/stockcheck"
        beforestate={{ gotStock: gotStock }}
        nexturl="/priority"
        nextstate={{ updatedStock: updatedStock }}
      />
    </PaddingDiv>
  );
}
