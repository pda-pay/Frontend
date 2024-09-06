import { useNavigate } from "react-router-dom";
import joinAPI from "../../../api/joinAPI";
import BasicButton from "../../../components/button/BasicButton";
import axios from "axios";

interface ButtonProps {
  unValid: boolean;
  userInfo: string[];
}

export default function JoinButtonbar({ unValid, userInfo }: ButtonProps) {
  const service = new joinAPI();
  const navigate = useNavigate();

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
        moveNext();
      } else if (response.status === 400) {
        console.log((await response).data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("에러 발생: " + error);
      }
    }
  };

  const moveNext = () => {
    navigate("/");
  };

  return (
    <BasicButton
      type="blue"
      disabled={unValid}
      onClick={() => {
        joinFinish();
        //if (btnValid) moveNext();
      }}
    >
      다음
    </BasicButton>
  );
}
