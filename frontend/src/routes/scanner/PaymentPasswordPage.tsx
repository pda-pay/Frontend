import React, { useEffect, useRef, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import axios from "axios";
import BeatLoaderDiv from "../../components/spinner/BeatLoaderDiv";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PaymentPasswordPage() {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const userId = 2;
  const input = useRef(null);

  useEffect(() => {
    if (password?.length < 6) return;

    setLoading(true);
    const title = "잘못된 비밀번호입니다.";

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
        input.current.value = "";
      })
      .finally(() => {
        setLoading(false);
      });
  }, [password]);

  const handlePassword = (event) => {
    console.log(event);
    setPassword(event.target.value);
  };

  return (
    <>
      {isLoading && <BeatLoaderDiv />}
      <PaddingDiv>
        <div className="flex justify-between flex-col h-[40vh]">
          <p className="mt-16 text-xl text-center font-bold">
            결제 비밀번호 6자리를 입력해주세요.
          </p>

          <input
            type="number"
            name="userId"
            maxLength={6}
            onChange={handlePassword}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="결제 비밀번호"
            ref={input}
          />
        </div>
      </PaddingDiv>
    </>
  );
}
