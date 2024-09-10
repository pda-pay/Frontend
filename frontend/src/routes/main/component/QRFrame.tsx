import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import { RiQrScan2Line } from "react-icons/ri";
import ServiceBlockFrame from "../../../components/backgroundframe/ServiceBlockFrame";
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
  font-size: 180px; // 아이콘 크기를 더 키웠습니다
  cursor: pointer;
`;

const CenteredIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const LargerContainer = styled.div`
  height: 400px; // 컨테이너의 높이를 400px로 설정
  width: 100%; // 너비는 100%로 유지
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
            if (member) {
              if (payValid) {
                navigate("/payment-pw-verify");
              } else {
                Swal.fire({
                  icon: "warning",
                  title:
                    '<span style="font-size: 20px; font-weight : bolder;">현재 결제 서비스를 이용할 수<br/> 없습니다.</span>',
                  confirmButtonColor: "blue",
                });
              }
            }
          }}
        >
          <AnimatedQRIcon />
        </CenteredIconContainer>
      </BackgroundFrame>
      {!member && (
        <div
          className="absolute inset-0 opacity-50"
          onClick={() => navigate("/serviceagree")}
        >
          <ServiceBlockFrame>
            결제 서비스에 가입해서 바로 확인해보세요.
          </ServiceBlockFrame>
        </div>
      )}
    </LargerContainer>
  );
}