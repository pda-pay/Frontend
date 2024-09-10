import { useNavigate } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import LargeButton from "../../components/button/LargeButton";
import userAPI from "../../api/userAPI";
import { useEffect } from "react";

export default function ApproachPage() {
  const userservice = new userAPI();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await userservice.checkMem();

      if (response.status === 200) {
        navigate("/main");
      }
    } catch (error) {
      navigate("/")
    }
  };

  useEffect(()=> {getUserInfo()},[]);

  return (
    <PaddingDiv>
      <div className="flex flex-col gap-10">
        <div className="font-bold text-lg">140PAY</div>
        <div className="flex flex-col gap-5">
          <LargeButton type="blue" onClick={() => navigate("/login")}>
            로그인하기
          </LargeButton>
          <LargeButton type="gray" onClick={() => navigate("/join")}>
            회원가입하기
          </LargeButton>
        </div>
      </div>
    </PaddingDiv>
  );
}
