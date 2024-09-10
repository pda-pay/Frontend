import { IoCardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
  active: boolean;
};

export default function CardButton({ active }: ButtonProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/payment")}
      style={{ color: active ? "#1c5cff" : "black" }}
    >
      <IoCardOutline className="size-6 ml-[3px]" />
      결제
    </div>
  );
}
