import BasicButton from "./BasicButton";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  nexttext?: string;
  beforetext?: string;
  nexturl: string;
  beforeurl: string;
  nextdisabled?: boolean;
  beforedisabled?: boolean;
  beforestate?: any;
  nextstate?: any;
}

export default function ButtonBar({
  nexttext,
  beforetext,
  nexturl,
  beforeurl,
  nextdisabled,
  beforedisabled,
  beforestate,
  nextstate,
}: ButtonProps) {
  const navigate = useNavigate();

  const moveToBefore = () => {
    if (beforestate !== undefined) {
      navigate(beforeurl, { state: beforestate });
    } else {
      navigate(beforeurl);
    }
  };

  const moveToNext = () => {
    if (nextstate !== undefined) {
      navigate(nexturl, { state: nextstate });
    } else {
      navigate(nexturl);
    }
  };

  return (
    <div
      className="flex justify-between
    "
    >
      <BasicButton
        type="gray"
        disabled={beforedisabled}
        //onClick={() => navigate(beforeurl)}
        onClick={moveToBefore}
      >
        {beforetext}
      </BasicButton>
      <BasicButton
        type="blue"
        disabled={nextdisabled}
        //onClick={() => navigate(nexturl)}
        onClick={moveToNext}
      >
        {nexttext}
      </BasicButton>
    </div>
  );
}
