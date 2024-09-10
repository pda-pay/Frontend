import { useEffect, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import ButtonBar from "../../components/button/ButtonBar";
import payServiceAPI from "../../api/payServiceAPI";
import axios from "axios";
import userAPI from "../../api/userAPI";

type AccountObject = {
  accountNumber: string;
  companyCode: string;
  companyName: string;
  category: string;
};

export default function SettingAccountPage() {
  const userservice = new userAPI();
  const payjoinservice = new payServiceAPI();

  const [mem, setMem] = useState<boolean>(false);

  //계좌번호, 은행코드, 은행명, 카테고리
  const [accountList, setAccountList] = useState<string[][]>([]);
  const [account, setAccount] = useState<string[]>([]);
  const [check, setCheck] = useState<boolean>(false);

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

  const getBankAccount = async () => {
    try {
      const response = await payjoinservice.getAccount();

      if (response.status === 200) {
        const data = response.data.accounts;
        saveAccountList(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log("계좌 선택 페이지 에러 발생: " + error);
        }
      }
    }
  };

  const putBankAccount = async (): Promise<boolean> => {
    try {
      const temp = makePriorityReqData();
      const response = await payjoinservice.putAccount(temp);
      if (response.status === 200) {
        return true;
      } else return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log("계좌 put 요청 에러 발생: " + error);
        }
      }
      return false;
    }
  };

  useEffect(() => {
    getBankAccount();
  }, []);

  const saveAccountList = (data: AccountObject[]) => {
    const temp: [string, string, string, string][] = data.map((item) => [
      item.accountNumber,
      item.companyCode,
      item.companyName,
      item.category,
    ]);
    setAccountList([...temp]);
  };

  const handleAccount = (index: number) => {
    setAccount([...accountList[index]]);
    setCheck(true);
  };

  const makePriorityReqData = () => {
    return {
      repaymentAccount: {
        accountNumber: account[0],
        companyCode: account[1],
        companyName: account[2],
        category: account[3],
      },
    };
  };

  return (
    <PaddingDiv>
      <BoldTitle>결제 계좌를 선택해주세요.</BoldTitle>
      <div className="flex flex-col gap-3">
        {accountList.map((row, index) => (
          <BackgroundFrame color="blue" cursor="pointer" hoverColor="#688db633">
            <div
              className="flex gap-10 cursor-pointer "
              onClick={() => handleAccount(index)}
            >
              <span>{row[2]}</span>
              <span>{row[0]}</span>
            </div>
          </BackgroundFrame>
        ))}
      </div>
      <div>
        <BoldTitle>선택한 계좌</BoldTitle>
        <BackgroundFrame color="blue">
          {account.length !== 0 ? (
            <div className="flex gap-10">
              <span>{account[2]}</span>
              <span>{account[0]}</span>
            </div>
          ) : (
            <div className="font-thin">계좌를 연결해주세요.</div>
          )}
        </BackgroundFrame>
      </div>

      <div className="mt-auto">
        {mem ? (
          <ButtonBar
            beforetext="취소"
            nexttext="수정 완료"
            beforeurl="/payment"
            nextdisabled={!check}
            nexturl="/payment"
            nextOnClick={putBankAccount}
          />
        ) : (
          <ButtonBar
            beforetext="이전"
            beforeurl="/limit"
            nexttext="완료"
            nextdisabled={!check}
            nexturl="/paymentdate"
            nextOnClick={putBankAccount}
          />
        )}
      </div>
    </PaddingDiv>
  );
}
