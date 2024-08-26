import { useNavigate } from "react-router-dom";
import BasicButton from "../../../components/button/BasicButton";

interface ButtonProps {
  valid: boolean;
}

export default function JoinButtonbar({ valid }: ButtonProps) {
  const navigate = useNavigate();
  return (
    <BasicButton
      type="blue"
      disabled={valid}
      onClick={() => navigate("/mydata")}
    >
      다음
    </BasicButton>
  );
}
