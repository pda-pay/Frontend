import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LargeButton from "../../components/button/LargeButton";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import QRFrame from "./component/QRFrame";
import Menubar from "../../components/menubar/Menubar";

export default function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  //이름, 아이디, 가입여부
  const [userInfo, setUserInfo] = useState<[string, string, boolean]>([
    "",
    "",
    false,
  ]);

  useEffect(() => {
    if (location.state) {
      if (location.state.name && location.state.id) {
        const { name } = location.state as { name: string };
        const { id } = location.state as { id: string };
        setUserInfo([name, id, userInfo[2]]);
      } else if (location.state.info) {
        const { info } = location.state as { info: [string, string, boolean] };
        setUserInfo([info[0], info[1], info[2]]);
      }
    }
  }, [location.state]);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  //TODO: 여기서 백엔드에게 가입 여부 가져오기

  return (
    <div style={{ backgroundColor: "#9abade33" }}>
      <PaddingDiv>
        <div>
          {!userInfo[2] && (
            <LargeButton
              type="blue"
              disabled={userInfo[2]}
              onClick={() =>
                navigate("/serviceagree", { state: { userInfo: userInfo } })
              }
            >
              결제 서비스 가입하기
            </LargeButton>
          )}

          <NormalTitle>
            {userInfo[0]}님, QR 코드를 인식해서 빠르게 결제해보세요.
          </NormalTitle>
          <QRFrame member={userInfo[2]}></QRFrame>
        </div>
      </PaddingDiv>
      <Menubar userInfo={userInfo} />
    </div>
  );
}
