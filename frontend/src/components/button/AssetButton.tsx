import { IoBarChart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AssetButton() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/asset")}>
      <IoBarChart className="size-6"></IoBarChart>
      자산
    </div>
  );
}
