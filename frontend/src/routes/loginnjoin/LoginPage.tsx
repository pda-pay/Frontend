import { useState, useEffect } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import LoginButtonbar from "./component/LoginButtonbar";
import LoginInput from "./component/LoginInput";

export default function LoginPage() {
  const [loginId, setLoginId] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleLoginId = (value: string | undefined) => {
    setLoginId(value);
  };

  const handlePWD = (value: string | undefined) => {
    setPassword(value);
  };

  useEffect(() => {
    console.log(loginId);
    console.log(password);
  }, [loginId, password]);
  return (
    <PaddingDiv>
      <div>
        <BoldTitle>안녕하세요!</BoldTitle>
      </div>
      <LoginInput handleLoginId={handleLoginId} handlePWD={handlePWD} />
      {/*TODO: 버튼 클릭시 api 요청을 보내 입력값들이 일치하는지 확인하는 로직 필요*/}
      <LoginButtonbar loginId={loginId} password={password} />
    </PaddingDiv>
  );
}
