import BasicButton from "./BasicButton";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  nexttext?: string;
  beforetext?: string;
  nexturl: string;
  beforeurl: string;
  nextdisabled?: boolean;
  beforedisabled?: boolean;
}

export default function ButtonBar({
  nexttext,
  beforetext,
  nexturl,
  beforeurl,
  nextdisabled,
  beforedisabled,
}: ButtonProps) {
  const navigate = useNavigate();

  return (
    <div>
      <BasicButton
        type="gray"
        disabled={beforedisabled}
        onClick={() => navigate(beforeurl)}
      >
        {beforetext}
      </BasicButton>
      <BasicButton
        type="blue"
        disabled={nextdisabled}
        onClick={() => navigate(nexturl)}
      >
        {nexttext}
      </BasicButton>
    </div>
  );
}
