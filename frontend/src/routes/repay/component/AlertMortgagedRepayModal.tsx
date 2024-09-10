import { useNavigate } from "react-router-dom";
import XButton from "../../../components/button/XButton";
import BasicModal from "../../../components/modal/BasicModal";

interface ModalProps {
  isAlertOpen: boolean;
  handleCloseAlert: () => void;
}

export default function AlertMortgagedRepayModal({
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
            navigate(-1);
          }}
        >
          <XButton />
        </span>
      </div>
      <div>상환되었습니다.</div>
    </BasicModal>
  );
}
