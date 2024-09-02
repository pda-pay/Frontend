import React, { useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import NormalTitle from "../../components/text/NormalTitle";
import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import ButtonBar from "../../components/button/ButtonBar";

export default function SettingLimitPage() {
  //TODO: api GET요청으로 받아온 데이터
  //현재한도, 최대한도, 담보
  const data: [number, number, number] = [50000000, 50000000, 10000000000];

  const [limit, setLimit] = useState<number>(data[0]);
  const [mortgageRate, setMortgageRate] = useState<number>(data[2] / limit);
  const [errLimit, setErrLimit] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>("");

  const validateLimit = () => {
    if (limit > data[1] || limit < 0 || mortgageRate < 140) {
      console.log("에러 발생 한도는 " + mortgageRate);
      setErrLimit(true);
    } else {
      console.log("에러 해제 ");
      setErrLimit(false);
    }
  };

  const updateLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    const vToNum = Number(v);

    console.log("값 들어옴 " + vToNum);

    if (!isNaN(vToNum) && v !== " ") {
      setInputValue(v);
      setLimit(vToNum);
    } else {
      setErrLimit(true);
    }
  };

  useEffect(() => {
    validateLimit();
  }, [limit, mortgageRate]);

  useEffect(() => {
    setMortgageRate(data[2] / limit);
  }, [limit]);

  return (
    <PaddingDiv>
      <BoldTitle>한도를 설정해보세요.</BoldTitle>
      <div>
        <NormalTitle>현재 고객님의 한도 현황입니다.</NormalTitle>
        <BackgroundFrame color="blue">
          <BoldTitle>현재 한도: {limit}</BoldTitle>
          <BoldTitle>최대 한도: {data[1]}</BoldTitle>
          <NormalTitle>담보: {data[2]}</NormalTitle>
          <NormalTitle>담보 유지 비율: {mortgageRate}%</NormalTitle>
        </BackgroundFrame>
        <div className="text-sm	text-gray-400">
          최대 한도를 늘리려면 담보를 더 잡아야 합니다.
        </div>
      </div>
      <div>
        <NormalTitle>원하시는 한도를 입력해주세요.</NormalTitle>
        <BackgroundFrame color="blue">
          <div>
            <label className="block">
              <span>최대 {data[1]}원 설정 가능합니다.</span>
              <input
                type="text"
                pattern="[0-9]*"
                name="limit"
                value={inputValue}
                onChange={updateLimit}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />
              {errLimit && (
                <p className="mt-2 text-sm text-red-600">
                  {
                    "최대 한도 이하의 담보 유지 비율 140%이 되는 한도로 설정해주세요."
                  }
                </p>
              )}
            </label>
          </div>
        </BackgroundFrame>
      </div>
      <ButtonBar
        beforetext="이전"
        beforeurl="/priority"
        nexttext="완료"
        nextdisabled={errLimit}
        nexturl="/"
      />
    </PaddingDiv>
  );
}
