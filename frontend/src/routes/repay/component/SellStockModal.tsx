import { useState } from "react";
import XButton from "../../../components/button/XButton";
import BasicModal from "../../../components/modal/BasicModal";
import MoveButton from "../../../components/button/MoveButton";

interface ModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  clickedRow:
    | [
        number,
        string,
        number,
        string,
        string,
        string,
        string,
        number,
        number,
        number,
        number
      ];
  selectSellStock: (
    row:
      | [
          number,
          string,
          number,
          string,
          string,
          string,
          string,
          number,
          number,
          number,
          number
        ],
    value: number
  ) => void;
}

export default function SellStockModal({
  isModalOpen,
  handleCloseModal,
  clickedRow,
  selectSellStock,
}: ModalProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [errInput, setErrInput] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string>("");

  const [selectedAmount, setSelectedAmount] = useState<number>(0);

  const validateInput = (ip: number) => {
    if (ip <= 0) {
      setErrInput(true);
      setErrMessage("최소 1주 이상 입력해주세요.");
    } else if (ip > clickedRow[2]) {
      setErrInput(true);
      setErrMessage(`${clickedRow[2]}주 이하로 입력해주세요.`);
    } else {
      setSelectedAmount(ip);
      setErrInput(false);
      setErrMessage("");
    }
  };

  const handleTempSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const valueToNum = Number(value);

    if (value === "" || !isNaN(Number(value))) {
      setInputValue(value);
      validateInput(valueToNum);
    }
  };

  return (
    <BasicModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
      <div className="flex flex-row-reverse">
        <span onClick={handleCloseModal}>
          <XButton />
        </span>
      </div>
      <label className="block">
        <span className="text-sm text-gray-400">
          최대 {clickedRow[2]}주 선택 가능합니다.
        </span>
        <input
          type="number"
          name="repay"
          value={inputValue}
          onChange={handleTempSelected}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        />
        {errInput && inputValue.length > 0 && (
          <p className="mt-2 text-sm text-red-600">
            {errMessage}
          </p>
        )}
      </label>
      {errInput ? (
        <MoveButton
          onClick={() => {
            handleCloseModal();
          }}
        >
          닫기
        </MoveButton>
      ) : (
        <MoveButton
          onClick={() => {
            selectSellStock(clickedRow, selectedAmount);
            handleCloseModal();
          }}
        >
          완료
        </MoveButton>
      )}
    </BasicModal>
  );
}