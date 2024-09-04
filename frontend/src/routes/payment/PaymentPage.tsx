import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import LargeButton from "../../components/button/LargeButton";
import Menubar from "../../components/menubar/Menubar";
import PayHistory from "./component/PayHistory";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<[string, string, boolean]>([
    "",
    "",
    false,
  ]);

  useEffect(() => {
    if (location.state) {
      const { info } = location.state as {
        info: [string, string, boolean];
      };
      setUserInfo([...info]);
    }
  }, [location.state]);

  useEffect(() => {
    console.log(userInfo);
  });

  return (
    <div style={{ backgroundColor: "#9abade33" }}>
      <PaddingDiv>
        <div>
          {userInfo[2] ? (
            <LargeButton
              type="blue"
              //TODO: QR로 결제하는 페이지로 이동
              // onClick={() =>
              //   navigate("/serviceagree", { state: { userInfo: userInfo } })
              // }
            >
              QR로 결제하기
            </LargeButton>
          ) : (
            <LargeButton
              type="blue"
              onClick={() =>
                navigate("/serviceagree", { state: { userInfo: userInfo } })
              }
            >
              결제 서비스 가입하기
            </LargeButton>
          )}
        </div>
        <PayHistory userInfo={userInfo} />
      </PaddingDiv>
      <Menubar userInfo={userInfo} />
    </div>
  );
}
