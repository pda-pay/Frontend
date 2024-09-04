import { IoCardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface InfoProps {
  userInfo: [string, string, boolean];
}

export default function CardButton({ userInfo }: InfoProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/payment", { state: { userInfo: userInfo } })}
    >
      <IoCardOutline className="size-6"></IoCardOutline>
      결제
    </div>
  );
}
