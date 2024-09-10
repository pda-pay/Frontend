import { useState } from "react";
import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";
import BasicButton from "../../../components/button/BasicButton";
import RangeSelectBar from "./RangeSelectBar";
import BoldTitle from "../../../components/text/BoldTitle";
import NormalTitle from "../../../components/text/NormalTitle";

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
      <div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row-reverse">
            <span onClick={onCloseModal}>
              <XButton />
            </span>
          </div>
          <div className="flex gap-5">
            <BoldTitle>선택한 주수:</BoldTitle>
            <BoldTitle>{amount} 주</BoldTitle>
          </div>
          <div className="flex gap-3 items-center">
            <NormalTitle>수정할 주수:</NormalTitle>
            <p className="w-1/3">
              <RangeSelectBar
                index={index}
                count={max}
                selected={amount}
                handleTempSelected={handleTempSelected}
              />
            </p>
          </div>
          <div className="flex gap-2 mt-32">
            <BasicButton onClick={handleDeleteButton}>종목 삭제</BasicButton>
            <BasicButton onClick={handleFinishButton}>선택 완료</BasicButton>
          </div>
        </div>
      </div>
    </BasicModal>
  );
}
