import MydataTerms from "./component/MydataTerms";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import AgreeFrame from "./component/AgreeFrame";
import BoldTitle from "../../components/text/BoldTitle";
import ButtonBar from "../../components/button/ButtonBar";

export default function MydataAgreePage() {
  return (
    <PaddingDiv>
      <div>
        <div className="mb-2">
          <BoldTitle>증권 정보 연동을 위한 약관에 동의해주세요!</BoldTitle>
        </div>

        <AgreeFrame>
          <MydataTerms />
        </AgreeFrame>
      </div>
      <div className="mt-auto">
        <ButtonBar
          nexturl="/join"
          beforeurl="/"
          nexttext="동의"
          beforetext="비동의"
        />
      </div>
    </PaddingDiv>
  );
}
