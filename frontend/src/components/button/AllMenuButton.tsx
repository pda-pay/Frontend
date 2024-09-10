import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  active: boolean;
};

export default function AllMenuButton({ active }: ButtonProps) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate("/allmenu")}
      style={{ color: active ? "#1c5cff" : "black" }}
    >
      <IoMenu className="size-6 ml-[3px]" />
      전체
    </div>
  );
}
