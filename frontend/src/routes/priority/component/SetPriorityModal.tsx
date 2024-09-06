import { useEffect, useState, useRef } from "react";
import XButton from "../../../components/button/XButton";
import BasicModal from "../../../components/modal/BasicModal";
import NormalTitle from "../../../components/text/NormalTitle";
import MoveButton from "../../../components/button/MoveButton";

interface ModalProps {
  unPriority: [
    string,
    number,
    string,
    string,
    number,
    string,
    string,
    number,
    number,
    number
  ][];
  isModalOpen: boolean;
  handleCloseModal: () => void;
  addPriority: (
    clickedRow: [
      string,
      number,
      string,
      string,
      number,
      string,
      string,
      number,
      number,
      number
    ],
    value: number
  ) => void;
}

export default function SetPriorityModal({
  unPriority,
  isModalOpen,
  handleCloseModal,
  addPriority,
}: ModalProps) {
  //여기 고객이 선택한 종목의 row 인덱스와 쪼갠 주수 저장
  //const [tempSelected, setTempSelected] = useState<[number, number]>();
  const [tempSelected, setTempSelected] =
    useState<
      [
        [
          string,
          number,
          string,
          string,
          number,
          string,
          string,
          number,
          number,
          number
        ],
        number
      ]
    >();
  //고객이 종목 누르면 입력창
  const [showInput, setShowInput] = useState<boolean>(false);
  //고객이 누른 종목의 row 인덱스
  const [clickedRowIdx, setClickedRowIdx] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  //인풋이 최대를 넘었을 경우
  const [errInput, setErrInput] = useState<boolean>(false);

  const openInput = () => {
    setShowInput(true);
  };

  const closeInput = () => {
    setShowInput(false);
  };

  const clickedStock = (index: number) => {
    //입력창을 열고
    openInput();
    //어떤 주식이 선택됐는지 unPriority 배열의 row 인덱스
    setClickedRowIdx(index);
  };

  const clickedFinishBtn = () => {
    if (tempSelected !== undefined) {
      addPriority(tempSelected[0], tempSelected[1]);
    }

    closeInput();
    handleCloseModal();
  };

  const validateInput = (ip: number) => {
    if (ip > unPriority[clickedRowIdx][1] || ip < 0) {
      setErrInput(true);
    } else setErrInput(false);
  };

  const handleTempSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; // 입력값을 문자열로 처리
    const valueToNum = Number(value);

    // 숫자 또는 빈 문자열일 때만 상태 업데이트
    if (value === "" || !isNaN(Number(value))) {
      setInputValue(value);
      validateInput(valueToNum);
      if (!errInput) setTempSelected([unPriority[clickedRowIdx], valueToNum]);
    }
  };

  //input 창 스크롤 방지
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 현재 focus가 inputRef에 있을 때만 실행
      if (document.activeElement === inputRef.current) {
        e.preventDefault();
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("wheel", handleWheel, { passive: false });

    // 이벤트 리스너 해제
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <BasicModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
      <div className="flex flex-row-reverse">
        <span onClick={handleCloseModal}>
          <XButton />
        </span>
      </div>

      {!showInput ? (
        <div>
          <NormalTitle>우선 순위가 정해지지 않은 담보 주식</NormalTitle>

          {unPriority.length !== 0 ? (
            <div className="text-xs">
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr>
                    <th>증권사명</th>
                    <th>종목명</th>
                    <th>남은 주수</th>
                    <th>전일 종가</th>
                    <th>등급</th>
                    <th>가능 한도</th>
                  </tr>
                </thead>
                {unPriority.map((stock, index) => (
                  <tbody onClick={() => clickedStock(index)}>
                    <tr>
                      <td>{stock[6]}</td>
                      <td>{stock[3]}</td>
                      <td>{stock[1]}</td>
                      <td>{stock[8]}</td>
                      <td>{stock[7]}</td>
                      <td>{stock[9]}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          ) : (
            <div>없습니다</div>
          )}
        </div>
      ) : (
        <div className="flex flex-col">
          <div>
            {unPriority[clickedRowIdx][6]} {unPriority[clickedRowIdx][3]}의 몇
            주를 우선순위에 추가할까요?
          </div>
          <label className="block">
            <span>최대 {unPriority[clickedRowIdx][1]}주 선택 가능합니다.</span>
            <input
              ref={inputRef}
              type="number"
              name="count"
              value={inputValue}
              onChange={handleTempSelected}
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
            {errInput && (
              <p className="mt-2 text-sm text-red-600">
                {"선택 가능한 범위 내에서 입력해주세요."}
              </p>
            )}
          </label>
          <MoveButton onClick={closeInput}>이전</MoveButton>
          {!errInput && (
            <MoveButton onClick={clickedFinishBtn}>완료</MoveButton>
          )}
        </div>
      )}
    </BasicModal>
  );
}
