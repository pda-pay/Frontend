import styled from "styled-components";

interface BackgroundProps {
  color: string;
  cursor?: string;
  hoverColor?: string;
  children: React.ReactNode;
}

const StyledDiv = styled.div<BackgroundProps>`
  border-radius: 20px;
  background-color: ${(props) =>
    props.color === "blue" ? "#9abade33" : "#ffffff"};
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  cursor: ${(props) => props.cursor || "default"};
  &:hover {
    background-color: ${(props) =>
      props.hoverColor || (props.color === "blue" ? "#9abade33" : "#ffffff")};
  }
`;

export default function BackgroundFrame({
  color,
  cursor,
  hoverColor,
  children,
}: BackgroundProps) {
  return (
    <StyledDiv color={color} cursor={cursor} hoverColor={hoverColor}>
      <div className="p-5">{children}</div>
    </StyledDiv>
  );
}
