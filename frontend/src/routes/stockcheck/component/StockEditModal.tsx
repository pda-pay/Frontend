import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";
import ChangeStockBar from "../../selectedstock/component/ChangeStockBar";

interface ModalProps {
  index: number;
  value: number | null;
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
  return (
    <BasicModal isOpen={isModalOpen} onRequestClose={onCloseModal}>
      <div className="flex flex-row-reverse">
        <span onClick={onCloseModal}>
          <XButton />
        </span>
      </div>
      <h2>선택한 값</h2>
      <p>{value}</p>
      <h2>최대 값</h2>
      <p>{max}</p>
      <div className="w-1/3">
        <ChangeStockBar
          index={index}
          count={max}
          selected={value}
          handleSelectedChage={updateStockList}
        />
      </div>
    </BasicModal>
  );
}
