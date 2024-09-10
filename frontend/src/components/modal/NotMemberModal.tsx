import { useNavigate } from "react-router-dom";
import MoveButton from "../button/MoveButton";
import XButton from "../button/XButton";
import BasicModal from "./BasicModal";

interface ModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export default function NotMemberModal({
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

      <div className="flex flex-col gap-2">
        <div>결제 서비스에 가입해야 이용 가능한 메뉴 입니다.</div>
        <div>가입하시겠습니까?</div>
        <MoveButton onClick={() => navigate("/serviceagree")}>
          서비스 가입하기
        </MoveButton>
      </div>
    </BasicModal>
  );
}
