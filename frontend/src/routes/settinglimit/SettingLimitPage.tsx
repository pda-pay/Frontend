import React, { useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import NormalTitle from "../../components/text/NormalTitle";
import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import ButtonBar from "../../components/button/ButtonBar";
import payServiceAPI from "../../api/payServiceAPI";
import axios from "axios";
import userAPI from "../../api/userAPI";
import { useLocation } from "react-router-dom";

export default function SettingLimitPage() {
  const userservice = new userAPI();
  const payjoinservice = new payServiceAPI();

  const location = useLocation();
  // 전달된 state를 받아옵니다. (default 값을 false로 설정)
  const { menu } = location.state || { menu: false };

  const [mem, setMem] = useState<boolean>(false);

  //TODO: api GET요청으로 받아온 데이터
  //현재한도, 최대한도, 담보금액
  //const data: [number, number, number] = [50000000, 50000000, 10000000000];
  const [totalLimit, setTotalLimit] = useState<number>(0);
  const [currentLimit, setCurrentLimit] = useState<number>(0);
  const [totalMortgagedPrice, setTotalMortgagedPrice] = useState<number>(0);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<number>(0);

  //currentlimit 사용 안해서 빌드에러나서 콘솔로그찍음
  useEffect(() => {
    console.log(currentLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //const [limit, setLimit] = useState<number>(data[0]);
  const [mortgageRate, setMortgageRate] = useState<number>(
    (totalMortgagedPrice / currentLimit) * 100
  );
  const [errLimit, setErrLimit] = useState<boolean>();
  const [errMsg, setErrMsg] = useState<string>("");

  const [inputValue, setInputValue] = useState<string>("");

  const getMem = async () => {
    try {
      const response = await userservice.checkMem();

      if (response.status === 200) {
        setMem(response.data.paymentServiceMember);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMem();
  }, []);

  const getLimit = async () => {
    try {
      const response = await payjoinservice.getLimit();

      if (response.status === 200) {
        const data = response.data;
        setTotalLimit(data.totalLimit);
        setCurrentLimit(data.currentLimit);
        setTotalMortgagedPrice(data.totalMortgagedPrice);
        setTotalPaymentAmount(data.totalPaymentAmount);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log("한도 get 요청 에러 발생: " + error);
        }
      }
    }
  };

  useEffect(() => {
    getLimit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const putLimit = async (): Promise<boolean> => {
    const temp = {
      currentLimit: currentLimit,
    };
    try {
      const response = await payjoinservice.putLimit(temp);

      if (response.status === 200) {
        return true;
      } else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const validateLimit = () => {
    if (
      currentLimit > totalLimit ||
      currentLimit < 0 ||
      mortgageRate < 140 ||
      totalPaymentAmount > currentLimit
    ) {
      setErrLimit(true);
      if (currentLimit > totalLimit)
        setErrMsg("최대 한도 이하로 설정해주세요.");
      else if (currentLimit < 0) setErrMsg("양수로 입력해주세요.");
      else if (mortgageRate < 140)
        setErrMsg("담보 유지 비율이 140% 이상이 되도록 설정해주세요.");
      else if (totalPaymentAmount > currentLimit)
        setErrMsg("결제 예정액 이상으로 설정해주세요.");
    } else {
      setErrLimit(false);
    }
  };

  const updateLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    const vToNum = Number(v);

    if (!isNaN(vToNum) && v !== " ") {
      setInputValue(v);
      setCurrentLimit(vToNum);
    } else {
      setErrMsg("정수로 입력해주세요.");
      setErrLimit(true);
    }
  };

  useEffect(() => {
    validateLimit();
  }, [currentLimit, mortgageRate]);

  useEffect(() => {
    setMortgageRate((totalMortgagedPrice / currentLimit) * 100);
  }, [currentLimit]);

  return (
    <PaddingDiv>
      <BoldTitle>한도를 설정해보세요.</BoldTitle>
      <div>
        <NormalTitle marginBottom="5px">
          현재 고객님의 한도 현황입니다.
        </NormalTitle>
        <BackgroundFrame color="blue">
          <BoldTitle>현재 한도: {currentLimit.toLocaleString()} 원</BoldTitle>
          <BoldTitle>최대 한도: {totalLimit.toLocaleString()} 원</BoldTitle>
          <br />
          <NormalTitle>
            결제 예정액: {totalPaymentAmount.toLocaleString()} 원
          </NormalTitle>
          <br />
          <NormalTitle>
            담보: {totalMortgagedPrice.toLocaleString()} 원
          </NormalTitle>
          <NormalTitle>
            담보 유지 비율: {(mortgageRate | 0).toLocaleString()}%
          </NormalTitle>
        </BackgroundFrame>
        <div className="text-sm	text-gray-400 mt-[5px]">
          최대 한도를 늘리려면 담보를 더 잡아야 합니다.
        </div>
      </div>
      <div>
        <NormalTitle marginBottom="10px">
          원하시는 한도를 입력해주세요.
        </NormalTitle>
        <BackgroundFrame color="blue">
          <div>
            <label className="block">
              <span className="text-sm text-gray-500">
                최대 {totalLimit.toLocaleString()}원 설정 가능합니다.
              </span>
              <input
                type="text"
                pattern="[0-9]*"
                name="limit"
                value={inputValue}
                onChange={updateLimit}
                placeholder={totalLimit.toString()}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />
              {errLimit && (
                <p className="mt-2 text-sm text-red-600">{errMsg}</p>
              )}
            </label>
          </div>
        </BackgroundFrame>
      </div>

      <div className="mt-auto">
        {mem ? (
          <div>
            {menu ? (
              <ButtonBar
                beforetext="취소"
                nexttext="수정 완료"
                beforeurl="/payment"
                nextdisabled={errLimit}
                nexturl="/payment"
                nextOnClick={putLimit}
              />
            ) : (
              <ButtonBar
                beforetext="이전"
                nexttext="수정 완료"
                beforeurl="/priority"
                nextdisabled={errLimit}
                nexturl="/payment"
                nextOnClick={putLimit}
              />
            )}
          </div>
        ) : (
          <ButtonBar
            beforetext="이전"
            beforeurl="/priority"
            nexttext="완료"
            nextdisabled={errLimit}
            nexturl="/account"
            nextOnClick={putLimit}
          />
        )}
      </div>
    </PaddingDiv>
  );
}
