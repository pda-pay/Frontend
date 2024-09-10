import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  active: boolean;
};

export default function HomeButton({ active }: ButtonProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/main")}
      style={{ color: active ? "#1c5cff" : "black" }}
    >
      <IoHomeOutline className="size-6 ml-[3px]" />
      메인
    </div>
  );
}
