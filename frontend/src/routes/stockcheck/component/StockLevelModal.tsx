import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";

interface ModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export default function StockLevelModal({
  isModalOpen,
  handleCloseModal,
}: ModalProps) {
  return (
    <BasicModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
      <div
        className="flex flex-row-reverse inline-block"
        onClick={handleCloseModal}
      >
        <XButton />
      </div>
      <h2>주식 등급 안내</h2>
      <p>A등급 ~</p>
    </BasicModal>
  );
}
