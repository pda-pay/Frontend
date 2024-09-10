import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import PaymentTerms from "./component/PaymentTerms";
import ButtonBar from "../../components/button/ButtonBar";
import BoldTitle from "../../components/text/BoldTitle";
import AgreeFrame from "./component/AgreeFrame";

export default function ServiceAgreePage() {
  return (
    <PaddingDiv>
      <div>
        <div className="mb-2">
          <BoldTitle>결제 서비스 이용을 위한 약관에 동의해주세요!</BoldTitle>
        </div>

        <AgreeFrame>
          <PaymentTerms />
        </AgreeFrame>
      </div>
      <div className="mt-auto">
        <ButtonBar
          nexturl="/stock"
          beforeurl="/main"
          nexttext="동의"
          beforetext="비동의"
        ></ButtonBar>
      </div>
    </PaddingDiv>
  );
}
