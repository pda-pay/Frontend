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
  beforeOnClick?: () => Promise<boolean>;
  nextOnClick?: () => Promise<boolean>;
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
  beforeOnClick,
  nextOnClick,
}: ButtonProps) {
  const navigate = useNavigate();

  const moveToBefore = () => {
    // if (beforestate !== undefined) {
    //   navigate(beforeurl, { state: beforestate });
    // } else {
    //   navigate(beforeurl);
    // }
    if (beforeOnClick !== undefined) {
      handleBeforeClick();
    }
    navigate(beforeurl);
  };

  // 결과에 따라 메소드를 실행하는 async 함수
  const handleBeforeClick = async () => {
    if (beforeOnClick !== undefined)
      try {
        const result = await beforeOnClick(); // putData의 결과 대기
        if (result) {
          navigate(beforeurl); // 성공 시
        } else {
          console.log("버튼바 이동 실패"); // 실패 시
        }
      } catch (error) {
        console.error("예상치 못한 오류 발생:", error);
      }
  };

  const moveToNext = () => {
    // if (nextstate !== undefined) {
    //   navigate(nexturl, { state: nextstate });
    // } else {
    //   navigate(nexturl);
    // }
    if (nextOnClick !== undefined) {
      //nextOnClick();
      handleNextClick();
    }
    navigate(nexturl);
  };

  // 결과에 따라 메소드를 실행하는 async 함수
  const handleNextClick = async () => {
    if (nextOnClick !== undefined)
      try {
        const result = await nextOnClick(); // putData의 결과 대기
        if (result) {
          navigate(nexturl); // 성공 시
        } else {
          console.log("버튼바 이동 실패"); // 실패 시
        }
      } catch (error) {
        console.error("예상치 못한 오류 발생:", error);
      }
  };

  return (
    <div className="flex justify-between">
      <BasicButton type="gray" disabled={beforedisabled} onClick={moveToBefore}>
        {beforetext}
      </BasicButton>
      <BasicButton type="blue" disabled={nextdisabled} onClick={moveToNext}>
        {nexttext}
      </BasicButton>
    </div>
  );
}
