import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import ButtonBar from "../../components/button/ButtonBar";
import { IoAddCircle } from "react-icons/io5";
import PriorityFrame from "./component/PriorityFrame";
import SetPriorityModal from "./component/SetPriorityModal";

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
      number, //0: id
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
      number, //0: id
      string, //1: 증권사 코드
      string, //2: 증권사명
      string, //3: 종목명
      string, //4: 등급
      number, //5: 전일종가
      number, //6: 남은 주수
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
              number, //0: id
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  let limit: number = 0;
  for (let i = 0; i < selectedStock.length; i++) {
    if (selectedStock[i][5] != 0) {
      limit += selectedStock[i][5] * selectedStock[i][7];
    }
  }

  const addPriority = (rowIdx: number, value: number) => {
    if (value > 0) {
      const changedArr: [
        number, //0: id
        string, //1: 증권사 코드
        string, //2: 증권사명
        string, //3: 종목명
        string, //4: 등급
        number, //5: 전일종가
        number, //6: 우선순위로 남은 주수
        number, //7: 담보로 잡은 전체 주수
        number, //8: 한도
        string //9: 계좌 번호
      ][] = unPriority.map((row, index) => {
        if (index === rowIdx) {
          return [
            row[0],
            row[1],
            row[2],
            row[3],
            row[4],
            row[5],
            row[6] - value,
            row[7],
            row[8],
            row[9],
          ];
        }
        return row;
      });

      // unpriority 업데이트
      setUnPriority(changedArr.filter((row) => row[6] !== 0));
      //setUnPriority(changedArr);

      //priority에 추가
      const addRow: [
        number, //0: id
        string, //1: 증권사 코드
        string, //2: 증권사명
        string, //3: 종목명
        string, //4: 등급
        number, //5: 전일종가
        number, //6: 우선순위로 넣은 주수
        number, //7: 담보로 잡은 전체 주수
        number, //8: 한도
        string //9: 계좌 번호
      ] = [
        unPriority[rowIdx][0],
        unPriority[rowIdx][1],
        unPriority[rowIdx][2],
        unPriority[rowIdx][3],
        unPriority[rowIdx][4],
        unPriority[rowIdx][5],
        value,
        unPriority[rowIdx][7],
        unPriority[rowIdx][8],
        unPriority[rowIdx][9],
      ];

      setPriority([...priority, addRow]);
    }
  };

  const deletePriority = (rowIndex: number) => {
    //지울 종목
    const tempRow: [
      number, //0: id
      string, //1: 증권사 코드
      string, //2: 증권사명
      string, //3: 종목명
      string, //4: 등급
      number, //5: 전일종가
      number, //6: 우선순위로 넣은 주수
      number, //7: 담보로 잡은 전체 주수
      number, //8: 한도
      string //9: 계좌 번호
    ] = priority[rowIndex];
    console.log("지울 항목 " + tempRow);
    const newUnPri = [...unPriority];

    if (unPriority.length === 0) {
      newUnPri.push([...tempRow]);
    } else {
      unPriority.map((row, index) => {
        if (row[0] === tempRow[0] && row[9] === tempRow[9]) {
          newUnPri[index][6] = unPriority[index][6] + tempRow[6];
        } else if (index === unPriority.length - 1) {
          newUnPri.push([...tempRow]);
        }
      });
    }

    setUnPriority(newUnPri);

    const newPriority = priority.filter((row, index) => rowIndex !== index);
    setPriority(newPriority);
  };

  const [priorityStock, setPriorityStock] = useState<
    [
      number, //0: id
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

  const settingPriorityStock = () => {
    //자동으로 우선 순위 적용
    //일단은, 가격이 높은 순으로
    const sortedArr = [...unPriority].sort((a, b) => b[5] * b[6] - a[5] * a[6]);
    setPriorityStock([...priority, ...sortedArr]);
  };

  useEffect(() => {
    settingPriorityStock();
  }, [unPriority]);

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
          <IoAddCircle className="size-32 text-gray-400" onClick={openModal} />
        </div>
      </div>

      <PriorityFrame
        priority={priority}
        unPriority={unPriority}
        deletePriority={deletePriority}
      />

      <ButtonBar
        beforetext="이전"
        nexttext="다음"
        beforeurl="/stock"
        beforestate={{ priorityToStock: selectedStock }}
        nexturl="/limit"
        nextstate={{ stock: selectedStock, priorityStock: priorityStock }}
      />

      {isModalOpen && (
        <SetPriorityModal
          unPriority={unPriority}
          isModalOpen={isModalOpen}
          handleCloseModal={closeModal}
          addPriority={addPriority}
        />
      )}
    </PaddingDiv>
  );
}
