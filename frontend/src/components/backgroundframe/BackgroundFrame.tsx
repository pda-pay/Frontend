import styled from "styled-components";

interface BackgroundProps {
  color: string;
  children: React.ReactNode;
}

const StyledDiv = styled.div<BackgroundProps>`
  border-radius: 20px;
  background-color: ${(props) =>
    props.color === "blue" ? "#9abade33" : "#ffffff"};
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
`;

export default function BackgroundFrame({ color, children }: BackgroundProps) {
  return (
    <StyledDiv color={color}>
      <div className="p-5">{children}</div>
    </StyledDiv>
  );
}
