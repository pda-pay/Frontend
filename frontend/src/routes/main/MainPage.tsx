import { useNavigate } from "react-router-dom";
import LargeButton from "../../components/button/LargeButton";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import QRFrame from "./component/QRFrame";
//import { useState } from "react";

export default function MainPage() {
  const navigate = useNavigate();
  //TODO: 여기서 로그인시 백엔드에서 받아온 이름
  //const [name, setName] = useState<string>("정윤현");
  const name: string = "정윤현";
  //TODO: 여기서 백엔드에게 받아온 가입 여부
  //const [member, setMember] = useState<boolean>(false);
  const member: boolean = false;

  return (
    <div style={{ backgroundColor: "#9abade33" }}>
      <PaddingDiv>
        <div>
          {!member && (
            <LargeButton
              type="blue"
              disabled={member}
              onClick={() => navigate("/serviceagree")}
            >
              결제 서비스 가입하기
            </LargeButton>
          )}

          <NormalTitle>
            {name}님, QR 코드를 인식해서 빠르게 결제해보세요.
          </NormalTitle>
          <QRFrame member={member}></QRFrame>
        </div>
      </PaddingDiv>
    </div>
  );
}
