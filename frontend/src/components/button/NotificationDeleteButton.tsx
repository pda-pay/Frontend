import React from "react";
import styled from "styled-components";

interface NotificationDeleteButtonProps {
  color?: string;
  display?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<NotificationDeleteButtonProps>`
  border: none;
  border-radius: 0;
  width: 100%;
  height: 80px;
  padding: 5px 10px;
  position: absolute;
  bottom: 0;
  background-color: #3469f2;
  display: ${(props) => props.display || "flex"};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  &:hover {
    background-color: #295ee5;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    color: #c4c4c4;
    cursor: not-allowed;
  }
  &:disabled:hover {
    background-color: #3469f2;
  }
`;

export default function NotificationDeleteButton({
  color,
  children,
  display,
  disabled,
  onClick,
}: NotificationDeleteButtonProps) {
  return (
    <StyledButton
      color={color}
      display={display}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
