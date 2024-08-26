import { useNavigate } from "react-router-dom";
import BasicButton from "../../../components/button/BasicButton";

export default function JoinButtonbar() {
  const navigate = useNavigate();
  return (
    <BasicButton
      type="blue"
      disabled={false}
      onClick={() => navigate("/mydata")}
    >
      다음
    </BasicButton>
  );
}
