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
        <BoldTitle>주식 안정성 안내</BoldTitle>
      </div>
      {/* <p>
        <span className="font-bold">1등급:</span> 가장 안정성이 높은 종목, 한도
        65%
      </p>
      <p>
        <span className="font-bold">2등급:</span> 안정성이 높은 종목, 한도 60%
      </p> */}
      <div className="flex flex-col gap-2">
        <p>각 안정성 그룹에 따라 한도는 다음과 같이 결정됩니다.</p>
        <p> - 1그룹: 전일 종가의 65% </p>
        <p> - 2그룹: 전일 종가의 60% </p>
        <p> - 3그룹: 전일 종가의 55%</p>
        <p>- 4그룹: 전일 종가의 50%</p>
        <p>- 5그룹: 전일 종가의 40%</p>
      </div>
    </BasicModal>
  );
}
