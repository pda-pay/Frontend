import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import LargeButton from "../../components/button/LargeButton";
import Menubar from "../../components/menubar/Menubar";
import PayInfo from "./component/PayInfo";
import NormalTitle from "../../components/text/NormalTitle";
import MoveButton from "../../components/button/MoveButton";

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
        <div>
          <NormalTitle>
            <span className="font-bold">{userInfo[0]}님,</span> 이번 달 결제
            예정 금액을 한눈에 확인해보세요.
          </NormalTitle>
          <PayInfo userInfo={userInfo} />
        </div>
        <div className="h-100 grid grid-cols-2 gap-5">
          <MoveButton onClick={() => navigate("/")}>선결제</MoveButton>
          <MoveButton onClick={() => navigate("/")}>한도 변경</MoveButton>
          <MoveButton onClick={() => navigate("/")}>담보 변경</MoveButton>
          <MoveButton onClick={() => navigate("/")}>결제 계좌 변경</MoveButton>
        </div>
      </PaddingDiv>
      <Menubar userInfo={userInfo} />
    </div>
  );
}
