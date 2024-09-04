import { IoBarChart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface InfoProps {
  userInfo: [string, string, boolean];
}

export default function AssetButton({ userInfo }: InfoProps) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/asset", { state: { userInfo: userInfo } })}>
      <IoBarChart className="size-6"></IoBarChart>
      자산
    </div>
  );
}
