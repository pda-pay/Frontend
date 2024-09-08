import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isAlertOpen: boolean;
  handleCloseAlert: () => void;
  result: {
    repaymentAmount: number;
    totalSellAmount: number;
    realRepaymentAmount: number;
    amountToAccount: number;
    message: string;
  };
}

export default function AlertRepayModal({
  isAlertOpen,
  handleCloseAlert,
  result,
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
        실시간 종가에 따라, {result.realRepaymentAmount.toLocaleString()}원
        상환되었습니다.
      </div>
      {result.amountToAccount > 0 && (
        <div>
          상환 후 남은 {result.amountToAccount.toLocaleString()}원이 연결된
          계좌로 입금됐습니다.
        </div>
      )}
    </BasicModal>
  );
}
