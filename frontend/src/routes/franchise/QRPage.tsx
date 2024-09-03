import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import LargeButton from "../../components/button/LargeButton";
import Swal from "sweetalert2";

export interface IqrValue {
  transactionId: string;
  franchiseCode: string | null;
  paymentAmount: number;
}

export default function QRPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(300);
  const [isAvailable, setAvailable] = useState(true);

  const [qrValue, setQrValue] = useState<IqrValue | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const state = location.state;

    const franchiseCode = localStorage.getItem("franchiseCode");

    if (franchiseCode == null) {
      Swal.fire({
        icon: "warning",
        title: `<span style="font-size: 20px; font-weight : bolder;">다시 로그인해주세요</span>`,
        confirmButtonColor: "blue",
      }).then(() => {
        navigate("/franchise/login");
      });
    }

    const amount = state.amount;

    const currentTime = Date.now().toString();
    const combined = franchiseCode + currentTime;
    const transactionId = CryptoJS.SHA256(combined).toString(CryptoJS.enc.Hex);

    setQrValue({
      transactionId: transactionId,
      franchiseCode: franchiseCode,
      paymentAmount: amount,
    });

    // const event = {
    //   data: {
    //     paymentDate: 123,
    //     paymentAmount: 10000,
    //   },
    // };

    wsRef.current = new WebSocket(
      "ws://43.201.53.172:8080/api/payment/socket?id=" + transactionId
    );
    wsRef.current.onmessage = (event: MessageEvent) => {
      const result = JSON.parse(event.data);
      const date = new Date(result.paymentDate);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      Swal.fire({
        icon: "success",
        title: `<span style="font-size: 20px; font-weight : bolder;">결제 완료</span>`,
        html: `<div> <p> 결제일: ${formattedDateTime}</p>  <p>금액: ${result.paymentAmount}원</p> </div>`,
        confirmButtonColor: "blue",
        timer: 2500,
      });
      navigate("/franchise/createqr");
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      setAvailable(false);
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <PaddingDiv>
      <div className="flex flex-col justify-between items-center h-full pt-10">
        {isAvailable && (
          <QRCodeCanvas
            value={JSON.stringify(qrValue)}
            className="border-primary border-4 rounded-xl"
            size={300}
          />
        )}

        {isAvailable && (
          <p className="text-xl">만료까지 남은 시간: {seconds} 초</p>
        )}
        {!isAvailable && (
          <div className="text-xl flex flex-col items-center">
            <p>QR코드가 만료되었습니다.</p>
            <p>다시 생성해주세요.</p>
          </div>
        )}

        <LargeButton
          type="blue"
          children={"다시 생성"}
          onClick={() => {
            navigate("/franchise/createqr");
          }}
        />
      </div>
    </PaddingDiv>
  );
}
