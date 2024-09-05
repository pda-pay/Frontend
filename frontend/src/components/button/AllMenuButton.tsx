import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AllMenuButton() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/allmenu")}>
      <IoMenu className="size-6"></IoMenu>
      전체
    </div>
  );
}
