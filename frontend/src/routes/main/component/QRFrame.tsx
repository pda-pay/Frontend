import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import { RiQrScan2Line } from "react-icons/ri";
import ServiceBlockFrame from "../../../components/backgroundframe/ServiceBlockFrame";
import { useNavigate } from "react-router-dom";
import userAPI from "../../../api/userAPI";
import axios from "axios";
import { useEffect, useState } from "react";

interface QRProps {
  member: boolean;
}

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
    <div className="relative">
      <BackgroundFrame color="white">
        <div
          className="flex justify-center items-center"
          onClick={() => {
            if (payValid) navigate("/payment-pw-verify");
          }}
        >
          <RiQrScan2Line className="size-64" />
        </div>
      </BackgroundFrame>

      {!member && (
        <div
          className="absolute inset-0  opacity-50"
          onClick={() => navigate("/serviceagree")}
        >
          <ServiceBlockFrame>
            결제 서비스에 가입해서 바로 확인해보세요.
          </ServiceBlockFrame>
        </div>
      )}
    </div>
  );
}
