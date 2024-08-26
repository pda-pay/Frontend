import { useNavigate } from "react-router-dom";
import LargeButton from "../../components/button/LargeButton";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import QRFrame from "./component/QRFrame";
import { useState } from "react";

export default function MainPage() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("정윤현");
  const [member, setMember] = useState<boolean>(false);

  return (
    <div style={{ backgroundColor: "#9abade33" }}>
      <PaddingDiv>
        <div>
          {/*TODO: 이미 가입돼있으면 이 버튼 display none*/}
          {!member && (
            <LargeButton
              type="blue"
              disabled={member}
              onClick={() => navigate("/")}
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
