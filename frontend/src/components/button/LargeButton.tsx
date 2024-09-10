import React from "react";
import styled from "styled-components";

interface ButtonProps {
  type?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  padding: "8px 16px";
  border: none;
  border-radius: 7px;
  font-size: "12px";
  color: white;
  background-color: ${(props) =>
    props.type === "blue" ? "#3469F2" : "#D9D9D9"};

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #f8f8f8;
    cursor: not-allowed;
  }
`;

export default function LargeButton({
  type,
  disabled,
  children,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton type={type} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
