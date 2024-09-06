import XButton from "../../../components/button/XButton";
import BasicModal from "../../../components/modal/BasicModal";
import BoldTitle from "../../../components/text/BoldTitle";

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
      <div className="mb-5">
        <BoldTitle>주식 등급 안내</BoldTitle>
      </div>
      <p>
        <span className="font-bold">1등급:</span> 가장 안정성이 높은 종목, 한도
        65%
      </p>
      <p>
        <span className="font-bold">2등급:</span> 안정성이 높은 종목, 한도 60%
      </p>
    </BasicModal>
  );
}
