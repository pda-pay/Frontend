import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LargeButton from "../../components/button/LargeButton";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import QRFrame from "./component/QRFrame";
import userAPI from "../../api/userAPI";
import axios from "axios";
import { requestFCMToken } from "../../main-router";
import fcmAPI from "../../api/fcmAPI";

export default function MainPage() {
  const userservice = new userAPI();
  const fcmApi = new fcmAPI();  

  const navigate = useNavigate();

  const [name, setName] = useState<string>("익명");
  const [member, setMember] = useState<boolean>(false);

  const fetchToken = async () => {
    const tokens = await requestFCMToken();

    if (tokens != null) {
      fcmApi.postUserInfo({token : tokens})
    }
  }

  const getUserInfo = async () => {
    try {
      const response = await userservice.checkMem();

      if (response.status === 200) {
        setName(response.data.name);
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
    fetchToken();
  }, []);

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
            <span className="font-bold">{name}님,</span> QR 코드를 인식해서
            빠르게 결제해보세요.
          </NormalTitle>
          <QRFrame member={member}></QRFrame>
        </div>
      </PaddingDiv>
    </div>
  );
}
