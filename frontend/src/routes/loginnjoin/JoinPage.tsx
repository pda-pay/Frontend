import { useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import JoinButtonbar from "./component/JoinButtonbar";
import JoinInput from "./component/JoinInput";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<string[]>(["", "", "", ""]);
  const handleUserInfo = (index: number, value: string) => {
    setUserInfo([
      ...userInfo.slice(0, index),
      value,
      ...userInfo.slice(index + 1),
    ]);
  };

  const [isButtonValid, setIsButtonUnValid] = useState<boolean>(false);

  const handleValidChange = (isValid: boolean) => {
    setIsButtonUnValid(isValid);
  };

  return (
    <PaddingDiv>
      <div className="flex flex-col gap-10">
        <span className="mr-auto" onClick={() => navigate("/")}>
          <IoChevronBackOutline />
        </span>
        <div>
          <BoldTitle>안녕하세요!</BoldTitle>
        </div>
      </div>
      <JoinInput
        onValidChange={handleValidChange}
        handleUserInfo={handleUserInfo}
      />
      <JoinButtonbar unValid={!isButtonValid} userInfo={userInfo} />
    </PaddingDiv>
  );
}
