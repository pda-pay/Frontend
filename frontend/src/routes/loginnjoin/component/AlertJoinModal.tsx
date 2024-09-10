import { useNavigate } from "react-router-dom";
import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";
import BoldTitle from "../../../components/text/BoldTitle";

interface ModalProps {
  isAlertOpen: boolean;
  handleCloseAlert: () => void;
}

export default function AlertJoinModal({
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
            navigate("/");
          }}
        >
          <XButton />
        </span>
      </div>
      <div>
        <BoldTitle>
          회원가입 성공!
          <br />
          로그인해주세요.
        </BoldTitle>
      </div>
    </BasicModal>
  );
}
