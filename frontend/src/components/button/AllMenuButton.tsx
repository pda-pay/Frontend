import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface InfoProps {
  userInfo: [string, string, boolean];
}

export default function AllMenuButton({ userInfo }: InfoProps) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/allmenu", { state: { info: userInfo } })}>
      <IoMenu className="size-6"></IoMenu>
      전체
    </div>
  );
}
