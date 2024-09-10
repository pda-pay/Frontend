import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  //width: 30%;
  padding: "8px 16px";
  border: none;
  border-radius: 7px;
  font-size: 15px;
  color: black;
  background-color: white;
  cursor: pointer;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f9f9f9;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #f8f8f8;
    cursor: not-allowed;
  }
`;

export default function MoveButton({ children, onClick }: ButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
