import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function HomeButton() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/main")}>
      <IoHomeOutline className="size-6"></IoHomeOutline>
      메인
    </div>
  );
}
