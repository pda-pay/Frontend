import { useNavigate } from "react-router-dom";
import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";
import BoldTitle from "../../../components/text/BoldTitle";

interface ModalProps {
  isAlertOpen: boolean;
  handleCloseAlert: () => void;
}

export default function AlertPriorityModal({
  isAlertOpen,
  handleCloseAlert,
}: ModalProps) {
  const navigate = useNavigate();
  return (
    <BasicModal isOpen={isAlertOpen} onRequestClose={handleCloseAlert}>
      <div className="flex flex-row-reverse">
        <span
          onClick={() => {
            handleCloseAlert();
            navigate("/payment");
          }}
        >
          <XButton />
        </span>
      </div>
      <div>
        <BoldTitle>변경되었습니다.</BoldTitle>
      </div>
    </BasicModal>
  );
}
