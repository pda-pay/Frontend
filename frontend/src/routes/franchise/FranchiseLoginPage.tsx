import { useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import BasicButton from "../../components/button/BasicButton";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import franchiseAPI from "../../api/franchiseAPI";

export default function FranchiseLoginPage() {
  const [franshiseId, setFranchiseId] = useState<number | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const navigate = useNavigate();
  const service = new franchiseAPI();

  const handleUserId = (event) => {
    setFranchiseId(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const clickLoginBtn = async () => {
    if (franshiseId?.length == 0 || password?.length == 0) {
      Swal.fire({
        icon: "warning",
        title: `<span style="font-size: 20px; font-weight : bolder;"> 가맹점 코드, 비밀번호를 입력해주세요</span>`,
        confirmButtonColor: "blue",
      });
    }

    try {
      const result = await service.login({
        code: franshiseId,
        password: password,
      });
      localStorage.setItem("franchiseCode", franshiseId);
      navigate("/franchise/createqr");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: `<span style="font-size: 20px; font-weight : bolder;"> 로그인 실패</span>`,
        confirmButtonColor: "blue",
      });
    }
  };

  return (
    <PaddingDiv>
      <div>
        <BoldTitle>가맹점 로그인</BoldTitle>
      </div>
      <div className="flex flex-col gap-10">
        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            가맹점코드를 입력해주세요.
          </span>
          <input
            type="text"
            name="franshiseId"
            value={franshiseId} // state에 저장된 이름을 input의 value로 설정
            onChange={handleUserId} // 입력이 변경될 때 state를 업데이트
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
        </label>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            비밀번호를 입력해주세요.
          </span>
          <input
            type="password"
            inputMode="numeric"
            name="password"
            value={password} // state에 저장된 이름을 input의 value로 설정
            onChange={handlePassword} // 입력이 변경될 때 state를 업데이트
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
        </label>
      </div>
      <BasicButton type="blue" disabled={false} onClick={clickLoginBtn}>
        로그인
      </BasicButton>
    </PaddingDiv>
  );
}
