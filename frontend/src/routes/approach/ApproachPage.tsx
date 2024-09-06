import { useNavigate } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import LargeButton from "../../components/button/LargeButton";

export default function ApproachPage() {
  const navigate = useNavigate();

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
