import { IoCardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function CardButton() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/payment")}>
      <IoCardOutline className="size-6"></IoCardOutline>
      결제
    </div>
  );
}
