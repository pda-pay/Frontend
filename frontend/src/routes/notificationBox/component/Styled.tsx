import styled from "styled-components";

interface paddingProps {
  padding?: string;
}

export const TopBar = styled.div`
  width: 100%;
  height: 50px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MenuListBar = styled.div`
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  &.active {
    cursor: grabbing;
  }
`;

export const MessageWrapper = styled.div<paddingProps>`
  background-color: #e8ecfb;
  padding: ${(props) => props.padding || "20px"};
  height: calc(100vh - 190px);
  overflow-y: scroll;
`;
export const MessageBoxWrapper = styled.div`
  width: 100%;
  margin: 20px 0;
`;
export const MessageBox = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #fdfcfa;
`;
