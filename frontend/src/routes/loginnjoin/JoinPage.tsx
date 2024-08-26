import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import JoinButtonbar from "./component/JoinButtonbar";
import JoinInput from "./component/JoinInput";

export default function JoinPage() {
  return (
    <PaddingDiv>
      <div>
        <BoldTitle>안녕하세여!</BoldTitle>
      </div>
      <JoinInput />
      <JoinButtonbar />
    </PaddingDiv>
  );
}
