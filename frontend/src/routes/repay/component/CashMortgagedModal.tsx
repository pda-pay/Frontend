import { useNavigate } from "react-router-dom";
import MoveButton from "../../../components/button/MoveButton";
import XButton from "../../../components/button/XButton";
import BasicModal from "../../../components/modal/BasicModal";

interface ModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export default function CashMortgagedModal({
  isModalOpen,
  handleCloseModal,
}: ModalProps) {
  const navigate = useNavigate();
  return (
    <BasicModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
      <div className="flex flex-row-reverse">
        <span onClick={handleCloseModal}>
          <XButton />
        </span>
      </div>
      <div className="flex flex-col gap-5 ">
        <MoveButton
          onClick={() => {
            navigate("/cashrepay");
          }}
        >
          은행 계좌로 선결제
        </MoveButton>
        <MoveButton
          onClick={() => {
            navigate("/mortgagedrepay");
          }}
        >
          담보 주식으로 선결제
        </MoveButton>
      </div>
    </BasicModal>
  );
}
