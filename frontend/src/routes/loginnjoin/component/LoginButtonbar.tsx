import { useNavigate } from "react-router-dom";
import BasicButton from "../../../components/button/BasicButton";

export default function LoginButtonbar() {
  const navigate = useNavigate();
  return (
    <BasicButton type="blue" disabled={false} onClick={() => navigate("/main")}>
      완료
    </BasicButton>
  );
}
