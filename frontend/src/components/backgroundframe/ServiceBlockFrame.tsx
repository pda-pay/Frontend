import styled from "styled-components";
import BoldTitle from "../text/BoldTitle";

interface BlockProps {
  children: React.ReactNode;
}

const StyledDiv = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
`;

export default function ServiceBlockFrame({ children }: BlockProps) {
  return (
    <StyledDiv>
      <div className="p-5 flex justify-center">
        <BoldTitle>{children}</BoldTitle>
      </div>
    </StyledDiv>
  );
}
