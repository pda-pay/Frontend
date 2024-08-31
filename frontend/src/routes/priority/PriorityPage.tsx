import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import ButtonBar from "../../components/button/ButtonBar";
import { IoAddCircle } from "react-icons/io5";
import PriorityFrame from "./component/PriorityFrame";

export default function PriorityPage() {
  const location = useLocation();

  const { selectedStock } = location.state as {
    selectedStock: [
      string, //0: 증권사 코드
      string, //1: 증권사명
      string, //2: 종목명
      string, //3: 등급
      number, //4: 전일종가
      number, //5: 선택한 주수
      number, //6: 전체 주수
      number, //7: 한도
      string //8: 계좌번호
    ][];
  };

  const [priority, setPriority] = useState<
    [
      number, //0: 인덱스
      string, //1: 증권사 코드
      string, //2: 증권사명
      string, //3: 종목명
      string, //4: 등급
      number, //5: 전일종가
      number, //6: 우선순위로 고른 주수
      number, //7: 담보로 잡은 전체 주수
      number, //8: 한도
      string //9: 계좌 번호
    ][]
  >([]);

  const [unPriority, setUnPriority] = useState<
    [
      number, //0: 인덱스
      string, //1: 증권사 코드
      string, //2: 증권사명
      string, //3: 종목명
      string, //4: 등급
      number, //5: 전일종가
      number, //6: 우선순위로 고른 주수
      number, //7: 담보로 잡은 전체 주수
      number, //8: 한도
      string //9: 계좌 번호
    ][]
  >([]);

  const settingUnPriority = () => {
    selectedStock.map((stock, index) => {
      if (stock[5] !== 0) {
        setUnPriority(
          (
            prev: [
              number, //0: 인덱스
              string, //1: 증권사 코드
              string, //2: 증권사명
              string, //3: 종목명
              string, //4: 등급
              number, //5: 전일종가
              number, //6: 우선순위로 남은 주수
              number, //7: 담보로 잡은 전체 주수
              number, //8: 한도
              string //9: 계좌 번호
            ][]
          ) => [
            ...prev,
            [
              index,
              stock[0],
              stock[1],
              stock[2],
              stock[3],
              stock[4],
              stock[5],
              stock[5],
              stock[7],
              stock[8],
            ],
          ]
        );
      }
    });
  };

  useEffect(() => {
    settingUnPriority();
  }, []);

  useEffect(() => {
    console.log("우선순위 주식");
    console.log(priority);
  }, [priority]);

  useEffect(() => {
    console.log("우선순위 X 주식");
    console.log(unPriority);
  }, [unPriority]);

  let limit: number = 0;
  for (let i = 0; i < selectedStock.length; i++) {
    if (selectedStock[i][5] != 0) {
      limit += selectedStock[i][5] * selectedStock[i][7];
    }
  }

  return (
    <PaddingDiv>
      <div>
        <NormalTitle>
          현재 확보한 총 한도는
          <span className="font-bold text-blue-700"> {limit}원</span> 입니다.
        </NormalTitle>
        <div className="text-sm	text-gray-400">
          + 버튼을 통해 반대매매 시 우선으로 처리할 증권을 추가해보세요.
        </div>
        <div className="flex justify-center">
          <IoAddCircle className="size-32 text-gray-400" />
        </div>
      </div>

      <PriorityFrame priority={priority} unPriority={unPriority} />

      <ButtonBar
        beforetext="이전"
        nexttext="다음"
        beforeurl="/stock"
        beforestate={{ priorityToStock: selectedStock }}
        nexturl="/limit"
        nextstate={{ stock: selectedStock }}
      />
    </PaddingDiv>
  );
}
