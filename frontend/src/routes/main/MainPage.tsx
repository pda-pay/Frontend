import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LargeButton from "../../components/button/LargeButton";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import QRFrame from "./component/QRFrame";
import userAPI from "../../api/userAPI";
import axios from "axios";

export default function MainPage() {
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
          {!memeber && (
            <LargeButton
              type="blue"
              disabled={memeber}
              onClick={() => navigate("/serviceagree")}
            >
              결제 서비스 가입하기
            </LargeButton>
          )}

          <NormalTitle>
            {name}님, QR 코드를 인식해서 빠르게 결제해보세요.
          </NormalTitle>
          <QRFrame member={memeber}></QRFrame>
        </div>
      </PaddingDiv>
    </div>
  );
}
