import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import LargeButton from "../../components/button/LargeButton";
import PayInfo from "./component/PayInfo";
import NormalTitle from "../../components/text/NormalTitle";
import MoveButton from "../../components/button/MoveButton";
import userAPI from "../../api/userAPI";
import axios from "axios";

export default function PaymentPage() {
  const userservice = new userAPI();
  const navigate = useNavigate();

  //TODO: 여기서 백엔드에게 이름과 가입 여부 가져오기
  const [name, setName] = useState<string>("익명");
  const [memeber, setMember] = useState<boolean>(false);

  const getUserInfo = async () => {
    try {
      const response = await userservice.checkMem();

      if (response.status === 200) {
        setName(response.data.userName);
        setMember(response.data.paymentServiceMember);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("에러 발생: " + error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div style={{ backgroundColor: "#9abade33" }}>
      <PaddingDiv>
        <div>
          {memeber ? (
            <LargeButton
              type="blue"
              //TODO: QR로 결제하는 페이지로 이동
              // onClick={() =>
              //   navigate("/qr"})
              // }
            >
              QR로 결제하기
            </LargeButton>
          ) : (
            <LargeButton type="blue" onClick={() => navigate("/serviceagree")}>
              결제 서비스 가입하기
            </LargeButton>
          )}
        </div>
        <div>
          <NormalTitle>
            <span className="font-bold">{name}님,</span> 이번 달 결제 예정
            금액을 한눈에 확인해보세요.
          </NormalTitle>
          <PayInfo />
        </div>
        <div className="h-100 grid grid-cols-2 gap-5">
          <MoveButton onClick={() => navigate("/")}>선결제</MoveButton>
          <MoveButton onClick={() => navigate("/limit")}>한도 변경</MoveButton>
          <MoveButton onClick={() => navigate("/stock")}>담보 변경</MoveButton>
          <MoveButton onClick={() => navigate("/account")}>
            결제 계좌 변경
          </MoveButton>
        </div>
      </PaddingDiv>
    </div>
  );
}
