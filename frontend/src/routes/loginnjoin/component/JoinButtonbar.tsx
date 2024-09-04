import { useNavigate } from "react-router-dom";
import joinApi from "../../../api/joinAPI";
import BasicButton from "../../../components/button/BasicButton";
import { useState } from "react";
import axios from "axios";

interface ButtonProps {
  unValid: boolean;
  userInfo: string[];
}

export default function JoinButtonbar({ unValid, userInfo }: ButtonProps) {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("에러 발생: " + error);
      }
      // if (error.response) {
      //   console.log("에러 발생: " + error);
      // }
    }
  };

  const moveNext = () => {
    navigate("/mydata");
  };

  return (
    <BasicButton
      type="blue"
      disabled={unValid}
      onClick={() => {
        joinFinish();
        if (btnValid) moveNext();
      }}
    >
      다음
    </BasicButton>
  );
}
