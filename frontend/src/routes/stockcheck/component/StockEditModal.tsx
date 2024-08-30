import { useState } from "react";
import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";
import ChangeStockBar from "../../selectedstock/component/ChangeStockBar";
import BasicButton from "../../../components/button/BasicButton";

interface ModalProps {
  index: number;
  value: number;
  max: number;
  isModalOpen: boolean;
  onCloseModal: () => void;
  updateStockList: (index: number, value: number) => void;
}

export default function StockEditModal({
  index,
  value,
  max,
  isModalOpen,
  onCloseModal,
  updateStockList,
}: ModalProps) {
  const [tempSelected, setTempSelected] = useState<[number, number]>([
    index,
    value,
  ]);

  const handleTempSelected = (index: number, cValue: number) => {
    if (cValue !== null) setTempSelected([index, cValue]);
  };

  const handleDeleteButton = () => {
    updateStockList(index, 0);
    onCloseModal();
  };

  const handleFinishButton = () => {
    updateStockList(tempSelected[0], tempSelected[1]);
    onCloseModal();
  };

  return (
    <BasicModal isOpen={isModalOpen} onRequestClose={onCloseModal}>
      <div className="flex flex-row-reverse">
        <span onClick={onCloseModal}>
          <XButton />
        </span>
      </div>
      <h2>선택한 주수: {value}</h2>
      <h2>
        수정할 주수:
        <p className="w-1/3">
          <ChangeStockBar
            index={index}
            count={max}
            selected={value}
            handleSelectedChage={handleTempSelected}
          />
        </p>
      </h2>
      <BasicButton onClick={handleDeleteButton}>삭제</BasicButton>
      <BasicButton onClick={handleFinishButton}>완료</BasicButton>
    </BasicModal>
  );
}
