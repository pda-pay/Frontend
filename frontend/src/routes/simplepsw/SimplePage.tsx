import { useEffect, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import ButtonBar from "../../components/button/ButtonBar";
import payServiceAPI from "../../api/payServiceAPI";
import axios from "axios";

export default function SimplePage() {
  const payjoinservice = new payServiceAPI();

  const [password, setPassword] = useState<string>();
  const [checkPsw, setCheckPsw] = useState<string>();
  const [errPsw, setErrPsw] = useState<boolean>();
  const [errChkPsw, setErrChkPsw] = useState<boolean>();
  const [inputValue, setInputValue] = useState<string>("");
  const [inputChkValue, setInputChkValue] = useState<string>("");

  const postPassword = async (): Promise<boolean> => {
    try {
      const temp = {
        paymentPassword: password,
      };

      const response = await payjoinservice.postSimplePassword(temp);

      if (response.status === 200) {
        return true;
      } else return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log("간편비번 post 요청 에러 발생: " + error);
        }
      }
      return false;
    }
  };

  const validatePsw = () => {
    if (password !== undefined && password.length !== 6) {
      setErrPsw(true);
    } else {
      setErrPsw(false);
    }
  };

  const updatePsw = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const vNum = Number(value);

    if (!isNaN(vNum) && value !== " ") {
      setPassword(value);
      setInputValue(value);
    } else {
      setErrPsw(true);
    }
  };

  useEffect(() => {
    validatePsw();
  }, [password, checkPsw]);

  const validateChkPsw = () => {
    if (password !== checkPsw) {
      setErrChkPsw(true);
    } else {
      setErrChkPsw(false);
    }
  };

  const updateChkPsw = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const vNum = Number(value);

    if (!isNaN(vNum) && value !== " ") {
      setCheckPsw(value);
      setInputChkValue(value);
    } else {
      setErrChkPsw(true);
    }
  };

  useEffect(() => {
    if (checkPsw !== undefined) validateChkPsw();
  }, [checkPsw, password]);

  return (
    <PaddingDiv>
      <div className="flex flex-col gap-10">
        <NormalTitle>결제 시 사용될 비밀번호를 설정해주세요.</NormalTitle>
        <div className="flex flex-col gap-10">
          <label className="block">
            <div className="mb-3">
              간편 비밀번호로 사용할 숫자 6자리를 입력해주세요.
            </div>
            <input
              type="password"
              pattern="[0-9]*"
              name="password"
              value={inputValue}
              onChange={updatePsw}
              placeholder={"000000"}
              inputMode="numeric"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
            {errPsw && (
              <p className="mt-2 text-sm text-red-600">
                {"비밀번호는 6자리 숫자로 이루어져야 합니다."}
              </p>
            )}
          </label>
          <label className="block">
            <div className="mb-3">비밀번호를 다시 한 번 입력해주세요.</div>
            <input
              type="password"
              pattern="[0-9]*"
              name="password"
              value={inputChkValue}
              onChange={updateChkPsw}
              placeholder={"000000"}
              inputMode="numeric"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
            {errChkPsw && (
              <p className="mt-2 text-sm text-red-600">
                {"비밀번호가 일치하지 않습니다."}
              </p>
            )}
          </label>
        </div>
      </div>
      <ButtonBar
        beforetext="이전"
        nexttext="가입완료"
        beforeurl="/confirm"
        nexturl="/main"
        nextdisabled={
          errChkPsw ||
          errPsw ||
          password === undefined ||
          checkPsw === undefined
        }
        nextOnClick={postPassword}
      />
    </PaddingDiv>
  );
}
