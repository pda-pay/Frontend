import { IoBarChart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  active: boolean;
};

export default function AssetButton({ active }: ButtonProps) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate("/asset")}
      style={{ color: active ? "#1c5cff" : "black" }}
    >
      <IoBarChart className="size-6 ml-[3px]" />
      자산
    </div>
  );
}
