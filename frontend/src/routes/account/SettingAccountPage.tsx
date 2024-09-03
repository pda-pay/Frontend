import { useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import ButtonBar from "../../components/button/ButtonBar";

export default function SettingAccountPage() {
  //TODO: api 요청으로 은행 목록 가져오기
  const data: [string, string][] = [
    ["신한은행", "0000-0000-0000"],
    ["국민은행", "1111-1111-1111"],
    ["하나은행", "2222-2222-2222"],
    ["신한은행", "3333-3333-3333"],
  ];
  const [account, setAccount] = useState<[string, string]>();
  const [check, setCheck] = useState<boolean>(false);

  const handleAccount = (index: number) => {
    setAccount([...data[index]]);
    setCheck(true);
  };

  return (
    <PaddingDiv>
      <BoldTitle>결제 계좌를 선택해주세요.</BoldTitle>
      <div className="flex flex-col gap-3">
        {data.map((row, index) => (
          <BackgroundFrame color="blue">
            <div className="flex gap-10" onClick={() => handleAccount(index)}>
              <span>{row[0]}</span>
              <span>{row[1]}</span>
            </div>
          </BackgroundFrame>
        ))}
      </div>
      <div>
        <BoldTitle>선택한 계좌</BoldTitle>
        <BackgroundFrame color="blue">
          {account !== undefined ? (
            <div className="flex gap-10">
              <span>{account[0]}</span>
              <span>{account[1]}</span>
            </div>
          ) : (
            <div>계좌를 연결해주세요.</div>
          )}
        </BackgroundFrame>
      </div>

      <ButtonBar
        beforetext="이전"
        beforeurl="/limit"
        nexttext="완료"
        nextdisabled={!check}
        nexturl="/paymentdate"
      />
    </PaddingDiv>
  );
}
