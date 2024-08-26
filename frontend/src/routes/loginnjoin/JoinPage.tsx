import { useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import JoinButtonbar from "./component/JoinButtonbar";
import JoinInput from "./component/JoinInput";

export default function JoinPage() {
  const [isButtonUnValid, setIsButtonUnValid] = useState<boolean>(false);

  const handleValidChange = (isValid: boolean) => {
    setIsButtonUnValid(isValid);
    console.log(isButtonUnValid);
  };

  return (
    <PaddingDiv>
      <div>
        <BoldTitle>안녕하세여!</BoldTitle>
      </div>
      <JoinInput onValidChange={handleValidChange} />
      <JoinButtonbar valid={!isButtonUnValid} />
    </PaddingDiv>
  );
}
