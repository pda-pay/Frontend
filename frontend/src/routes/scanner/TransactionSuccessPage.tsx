import React from "react";
import axios, { Axios } from "axios";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import ButtonBar from "../../components/button/ButtonBar";
import { useLocation } from "react-router-dom";

export default function TransactionSuccessPage() {
  const location = useLocation();
  const result = location.state;

  console.log(result);

  return (
    <PaddingDiv>
      <p className="mt-16 text-xl text-center font-bold">
        결제가 완료되었습니다.
      </p>

      <BackgroundFrame color="blue">
        <div className="h-[25vh] font-bold flex flex-col justify-between">
          <div className="mt-5 gap-y-1 flex flex-col">
            <p>결제 가맹점: {result.franchiseName}</p>
            <p>
              결제 금액:{" "}
              {result.paymentAmount
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              원
            </p>
            <p>결제일시: {result.date}</p>
          </div>

          <div className="mt-5 mb-5">
            <p>
              잔여한도:{" "}
              {result.leftCreditLimit
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              원
            </p>
          </div>
        </div>
      </BackgroundFrame>

      <ButtonBar
        beforeurl="/main"
        nexturl="/payment"
        beforetext="메인으로"
        nexttext="결제내역으로"
      ></ButtonBar>
    </PaddingDiv>
  );
}
