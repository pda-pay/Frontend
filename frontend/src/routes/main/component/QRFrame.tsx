import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import { RiQrScan2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import userAPI from "../../../api/userAPI";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import styled, { keyframes } from 'styled-components';

interface QRProps {
  member: boolean;
}

const scanAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const gradientAnimation = keyframes`
  0% {
    color: #4285F4;
  }
  25% {
    color: #34A853;
  }
  50% {
    color: #FBBC05;
  }
  75% {
    color: #EA4335;
  }
  100% {
    color: #4285F4;
  }
`;

const AnimatedQRIcon = styled(RiQrScan2Line)`
  animation:
    ${scanAnimation} 2s ease-in-out infinite,
    ${gradientAnimation} 8s linear infinite;
  font-size: 180px;
  cursor: pointer;
`;

const CenteredIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
`;

const LargerContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const OverlayMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  color: #4285F4;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;

export default function QRFrame({ member }: QRProps) {
  const navigate = useNavigate();
  const userservice = new userAPI();
  const [payValid, setPayValid] = useState<boolean>(true);

  const getUserInfo = async () => {
    try {
      const response = await userservice.checkMem();
      if (response.status === 200) {
        setPayValid(response.data.paymentAccess);
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
    <LargerContainer>
      <BackgroundFrame color="white">
        <CenteredIconContainer
          onClick={() => {
            if (member && payValid) {
              navigate("/payment-pw-verify");
            } else if (member && !payValid) {
              Swal.fire({
                icon: "warning",
                title:
                  '<span style="font-size: 20px; font-weight : bolder;">현재 결제 서비스를 이용할 수<br/> 없습니다.</span>',
                confirmButtonColor: "blue",
              });
            }
          }}
        >
          <AnimatedQRIcon />
          {!member && (
            <OverlayMessage onClick={() => navigate("/serviceagree")}>
              결제 서비스에 가입해서<br />바로 확인해보세요.
            </OverlayMessage>
          )}
        </CenteredIconContainer>
      </BackgroundFrame>
    </LargerContainer>
  );
}