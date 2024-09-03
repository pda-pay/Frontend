import React, { useEffect, useRef, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import axios from "axios";
import BeatLoaderDiv from "../../components/spinner/BeatLoaderDiv";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PinInput from "react-pin-input";

export default function PaymentPasswordPage() {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const userId = 2;

  useEffect(() => {
    if (password?.length < 6) return;

    setLoading(true);
    const title = "잘못된 비밀번호입니다.";

    console.log(password);

    axios
      .post(
        "http://43.201.53.172:8080/api/payment/auth",
        {
          userId: userId,
          paymentPassword: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        navigate("/scanner", { state: res.data.token });
      })
      .catch((err) => {
        Swal.fire({
          icon: "warning",
          title: `<span style="font-size: 20px; font-weight : bolder;"> ${title}</span>`,
          confirmButtonColor: "blue",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [password]);

  const handlePassword = (value, index) => {
    setPassword(value);
  };

  return (
    <>
      {isLoading && <BeatLoaderDiv />}
      <PaddingDiv>
        <div className="flex justify-between flex-col h-[40vh] items-center">
          <p className="mt-16 text-xl text-center font-bold">
            결제 비밀번호 6자리를 입력해주세요.
          </p>
          <PinInput
            length={6}
            initialValue=""
            secret={true}
            focus={true}
            type="numeric"
            autoSelect={true}
            inputMode="numeric"
            onChange={handlePassword}
          />
        </div>
      </PaddingDiv>
    </>
  );
}
