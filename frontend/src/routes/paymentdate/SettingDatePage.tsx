import { useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import NormalTitle from "../../components/text/NormalTitle";
import ButtonBar from "../../components/button/ButtonBar";
import payServiceAPI from "../../api/payServiceAPI";
import axios from "axios";

export default function SettingDatePage() {
  const payjoinservice = new payServiceAPI();

  const date: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27,
  ];
  const [paymentDate, setPaymentDate] = useState<number>(0);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const putPaymentDate = async (): Promise<boolean> => {
    try {
      const temp = {
        repaymentDate: paymentDate,
      };
      const response = await payjoinservice.putPaymentDate(temp);

      if (response.status === 200) {
        return true;
      } else return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log("상환일 put 요청 에러 발생: " + error);
        }
      }
      return false;
    }
  };

  const handleClick = (date: number) => {
    setIsClicked(true);
    setPaymentDate(date);
  };

  return (
    <PaddingDiv>
      <BoldTitle>결제일을 선택해주세요.</BoldTitle>
      <div className="grid grid-cols-4 gap-4">
        {date.map((item, index) => (
          <button
            key={index}
            className="text-center rounded-lg"
            style={{
              backgroundColor: `${
                item === paymentDate ? "#9abade" : "transparent"
              }`,
              border: "1px solid #9abade",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
              fontSize: "16px",
            }}
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div>
        {isClicked ? (
          <NormalTitle>
            선택된 결제일은{" "}
            <span className="font-bold text-blue-600">{paymentDate}일</span>{" "}
            입니다.{" "}
          </NormalTitle>
        ) : (
          <div></div>
        )}
      </div>
      <ButtonBar
        beforetext="이전"
        beforeurl="/account"
        nexttext="완료"
        nexturl="/confirm"
        nextdisabled={!isClicked}
        nextOnClick={putPaymentDate}
      />
    </PaddingDiv>
  );
}
