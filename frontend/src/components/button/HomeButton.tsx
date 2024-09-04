import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface InfoProps {
  userInfo: [string, string, boolean];
}

export default function HomeButton({ userInfo }: InfoProps) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/main", { state: { info: userInfo } })}>
      <IoHomeOutline className="size-6"></IoHomeOutline>
      메인
    </div>
  );
}
