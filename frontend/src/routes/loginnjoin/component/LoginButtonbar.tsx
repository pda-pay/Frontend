import { useNavigate } from "react-router-dom";
import BasicButton from "../../../components/button/BasicButton";
import loginApi from "../../../api/loginAPI";
import { useState } from "react";
import axios from "axios";

interface LoginProps {
  loginId: string | undefined;
  password: string | undefined;
}

export default function LoginButtonbar({ loginId, password }: LoginProps) {
  const service = new loginApi();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState<string>();

  const postLoginInfo = async () => {
    try {
      const response = await service.postUserLoginInfo({
        loginId: loginId,
        password: password,
      });

      if (response.status === 200) {
        navigate("/main", { state: { id: loginId, name: response.data.name } });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 400) {
          setErrMsg(error.response.data.message);
        }
        console.log("로그인 에러 발생: " + error);
      }
    }
  };

  const clickBtn = () => {
    postLoginInfo();
  };

  return (
    <div>
      {errMsg !== undefined && (
        <p className="mt-2 text-sm text-red-600">{errMsg}</p>
      )}
      <BasicButton
        type="blue"
        disabled={false}
        onClick={() => {
          clickBtn();
        }}
      >
        완료
      </BasicButton>
    </div>
  );
}
