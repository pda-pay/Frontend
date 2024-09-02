import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";

export default function SettingDatePage() {
  return (
    <PaddingDiv>
      <div>
        <BoldTitle>결제일 선택</BoldTitle>
        <BackgroundFrame color="blue">
          <div>달력</div>
        </BackgroundFrame>
      </div>
    </PaddingDiv>
  );
}
