import React from "react";
import styled from "styled-components";

interface NotificationButtonProps {
  marginRight?: string;
  marginBottom?: string;
  backgroundColor?: string;
  color?: string;
  hoverBackgroundColor?: string;
  fontSize?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<NotificationButtonProps>`
  display: inline-block;
  margin-right: ${(props) => props.marginRight || "10px"};
  margin-bottom: ${(props) => props.marginBottom || "0"};
  border-radius: 20px;
  border: 1px solid #f0f0f0;
  height: 40px;
  padding: 5px 10px;
  background-color: ${(props) => props.backgroundColor || "#f0f0f0"};
  color: ${(props) => props.color || "black"};
  font-size: ${(props) => props.fontSize || "16px"};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor || "#363e57"};
    border: 1px solid gray;
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

export default function NotificationButton({
  marginRight,
  marginBottom,
  backgroundColor,
  color,
  hoverBackgroundColor,
  fontSize,
  children,
  onClick,
}: NotificationButtonProps) {
  return (
    <StyledButton
      marginRight={marginRight}
      marginBottom={marginBottom}
      backgroundColor={backgroundColor}
      color={color}
      hoverBackgroundColor={hoverBackgroundColor}
      fontSize={fontSize}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
