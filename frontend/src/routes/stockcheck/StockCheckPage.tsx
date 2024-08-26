import ButtonBar from "../../components/button/ButtonBar";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import CardList from "./component/CardList";

export default function StockCheckPage() {
  return (
    <PaddingDiv>
      <BoldTitle>담보로 잡을 주식을 선택해주세요.</BoldTitle>
      <CardList></CardList>
      <ButtonBar
        beforetext="이전"
        nexttext="다음"
        beforeurl="/serviceagree"
        nexturl="/"
      ></ButtonBar>
    </PaddingDiv>
  );
}
