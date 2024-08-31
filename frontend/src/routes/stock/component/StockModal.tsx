import { useState } from "react";
import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";
import BasicButton from "../../../components/button/BasicButton";
import RangeSelectBar from "./RangeSelectBar";

interface ModalProps {
  index: number;
  amount: number;
  max: number;
  isModalOpen: boolean;
  onCloseModal: () => void;
  handleTemp: (index: number, amount: number) => void;
}

export default function StockModal({
  index,
  amount,
  max,
  isModalOpen,
  onCloseModal,
  handleTemp,
}: ModalProps) {
  const [tempSelected, setTempSelected] = useState<[number, number]>([
    index,
    amount,
  ]);

  const handleTempSelected = (index: number, amount: number) => {
    if (amount !== null) setTempSelected([index, amount]);
  };

  const handleDeleteButton = () => {
    handleTemp(index, 0);
    onCloseModal();
  };

  const handleFinishButton = () => {
    handleTemp(tempSelected[0], tempSelected[1]);
    onCloseModal();
  };

  return (
    <BasicModal isOpen={isModalOpen} onRequestClose={onCloseModal}>
      <div className="flex flex-row-reverse">
        <span onClick={onCloseModal}>
          <XButton />
        </span>
      </div>
      <h2>선택한 주수: {amount}</h2>
      <h2>
        수정할 주수:
        <p className="w-1/3">
          <RangeSelectBar
            index={index}
            count={max}
            selected={amount}
            handleTempSelected={handleTempSelected}
          />
        </p>
      </h2>
      <BasicButton onClick={handleDeleteButton}>삭제</BasicButton>
      <BasicButton onClick={handleFinishButton}>완료</BasicButton>
    </BasicModal>
  );
}
