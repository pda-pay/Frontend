import ButtonBar from "../../components/button/ButtonBar";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";

export default function SelectedStockPage() {
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
        nexturl="/priority"
      />
    </PaddingDiv>
  );
}
