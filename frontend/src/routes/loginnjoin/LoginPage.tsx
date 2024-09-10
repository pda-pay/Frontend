import { useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import LoginInput from "./component/LoginInput";
import loginApi from "../../api/loginAPI";
import ButtonBar from "../../components/button/ButtonBar";
import axios from "axios";

export default function LoginPage() {
  const service = new loginApi();

  const [loginId, setLoginId] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [errMsg, setErrMsg] = useState<string>();

  const postLoginInfo = async (): Promise<boolean> => {
    try {
      const response = await service.postUserLoginInfo({
        loginId: loginId,
        password: password,
      });

      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 400) {
          setErrMsg(error.response.data.message);
        }
        console.log("로그인 에러 발생: " + error);
      }
      return false;
    }
  };

  // const clickBtn = () => {
  //   postLoginInfo();
  // };

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
      {/* <LoginButtonbar loginId={loginId} password={password} /> */}
      <div>
        {errMsg !== undefined && (
          <p className="mt-2 text-sm text-red-600 mb-[20px]">{errMsg}</p>
        )}
        <ButtonBar
          beforetext="이전"
          beforeurl="/"
          nexttext="로그인하기"
          nexturl="/main"
          nextOnClick={postLoginInfo}
        />
      </div>
    </PaddingDiv>
  );
}
