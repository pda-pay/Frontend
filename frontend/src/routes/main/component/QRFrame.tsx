import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import { RiQrScan2Line } from "react-icons/ri";
import ServiceBlockFrame from "../../../components/backgroundframe/ServiceBlockFrame";
import { useNavigate } from "react-router-dom";

interface QRProps {
  member: boolean;
}

export default function QRFrame({ member }: QRProps) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <BackgroundFrame color="white">
        <div
          className="flex justify-center items-center"
          onClick={() => navigate("/payment-pw-verify")}
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
