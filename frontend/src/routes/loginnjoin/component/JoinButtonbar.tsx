import { useNavigate } from "react-router-dom";
import joinApi from "../../../api/joinAPI";
import BasicButton from "../../../components/button/BasicButton";
import { useEffect, useState } from "react";

interface ButtonProps {
  valid: boolean;
  userInfo: string[];
}

export default function JoinButtonbar({ valid, userInfo }: ButtonProps) {
  const service = new joinApi();
  const navigate = useNavigate();

  const [btnValid, setBtnValid] = useState<boolean>(false);

  const joinFinish = async () => {
    try {
      const response = await service.postUserInfo({
        loginId: userInfo[0],
        password: userInfo[1],
        name: userInfo[2],
        phoneNumber: userInfo[3],
      });

      if (response.status === 201) {
        //여기서 버튼 비활성화 state 관리
        setBtnValid(true);
      } else if (response.status === 400) {
        console.log((await response).data.message);
        //여기서 에러 메시지 출력하고 state 버튼 비호라성황
        setBtnValid(false);
      }
    } catch (error: any) {
      if (error.response) {
        console.log("에러 발생: " + error);
      }
    }
  };

  return (
    <BasicButton
      type="blue"
      disabled={valid || btnValid}
      onClick={() => {
        joinFinish();
        if (btnValid) navigate("/mydata");
      }}
    >
      다음
    </BasicButton>
  );
}
