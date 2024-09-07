import { useState } from "react";
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

  return (
    <PaddingDiv>
      <div>
        <BoldTitle>안녕하세요!</BoldTitle>
      </div>
      <LoginInput handleLoginId={handleLoginId} handlePWD={handlePWD} />
      <LoginButtonbar loginId={loginId} password={password} />
    </PaddingDiv>
  );
}
