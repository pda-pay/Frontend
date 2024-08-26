import styled from "styled-components";
import BoldTitle from "../text/BoldTitle";

const StyledDiv = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
`;

export default function ServiceBlockFrame() {
  return (
    <StyledDiv>
      <div className="p-5">
        <BoldTitle>결제 서비스에 가입해서 바로 확인해보세요.</BoldTitle>
      </div>
    </StyledDiv>
  );
}
