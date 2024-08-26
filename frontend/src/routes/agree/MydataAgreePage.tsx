import MydataTerms from "./component/MydataTerms";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import AgreeFrame from "./component/AgreeFrame";
import BoldTitle from "../../components/text/BoldTitle";
import ButtonBar from "../../components/button/ButtonBar";

export default function MydataAgreePage() {
  return (
    <PaddingDiv>
      <div>
        <BoldTitle>마이데이터 연동을 위한 약관에 동의해주세요!</BoldTitle>
        <AgreeFrame>
          <MydataTerms />
        </AgreeFrame>
      </div>
      <ButtonBar
        nexturl="/main"
        beforeurl="/join"
        nexttext="동의"
        beforetext="비동의"
      ></ButtonBar>
    </PaddingDiv>
  );
}
