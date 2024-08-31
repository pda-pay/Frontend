import XButton from "../../../components/button/XButton";
import BasicModal from "../../../components/modal/BasicModal";

interface ModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export default function LevelInfoModal({
  isModalOpen,
  handleCloseModal,
}: ModalProps) {
  return (
    <BasicModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
      <div className="flex flex-row-reverse">
        <span onClick={handleCloseModal}>
          <XButton />
        </span>
      </div>
      <h1>주식 등급 안내</h1>
      <p>AAA등급: 가장 안정성이 높은 종목</p>
      <p>AA~A등급: 안정성이 높은 종목</p>
    </BasicModal>
  );
}
