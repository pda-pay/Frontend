import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import LoginButtonbar from "./component/LoginButtonbar";
import LoginInput from "./component/LoginInput";

export default function LoginPage() {
  return (
    <PaddingDiv>
      <div>
        <BoldTitle>안녕하세여!</BoldTitle>
      </div>
      <LoginInput />
      {/*TODO: 버튼 클릭시 api 요청을 보내 입력값들이 일치하는지 확인하는 로직 필요*/}
      <LoginButtonbar />
    </PaddingDiv>
  );
}
