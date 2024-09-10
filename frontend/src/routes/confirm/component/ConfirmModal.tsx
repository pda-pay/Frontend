import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";
import styled from "styled-components";

interface ModalProps {
  priority?: [
    string,
    number,
    string,
    string,
    number,
    string,
    string,
    number,
    number,
    number
  ][];
  mortgage?: [
    string,
    number,
    string,
    string,
    string,
    string,
    number,
    number,
    number
  ][];
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate; /* border-spacing을 적용하기 위해 separate로 설정 */
  border-spacing: 0 10px; /* 행 사이에 10px 간격을 추가 */
`;

export default function ConfirmModal({
  priority,
  mortgage,
  isModalOpen,
  handleCloseModal,
}: ModalProps) {
  return (
    <BasicModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
      <div className="flex flex-row-reverse">
        <span onClick={handleCloseModal}>
          <XButton />
        </span>
      </div>
      <div>
        {mortgage !== undefined ? (
          <div className="text-xs mt-5">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderSpacing: "0 10px",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th>증권사명</th>
                  <th>종목명</th>
                  <th>담보잡은 주수</th>
                  <th>전일 종가</th>
                  <th>안정성</th>
                  {/* <th>가능 한도</th> */}
                </tr>
              </thead>
              {mortgage.map((stock) => (
                <tbody>
                  <tr>
                    <td>{stock[5]}</td>
                    <td>{stock[3]}</td>
                    <td>{stock[1]}</td>
                    <td>{stock[7].toLocaleString()}</td>
                    <td>{stock[6]}</td>
                    {/* <td>{(stock[8] * stock[1]).toLocaleString()}</td> */}
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        ) : (
          <div className="text-xs mt-5">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th>증권사명</th>
                  <th>종목명</th>
                  <th>담보잡은 주수</th>
                  <th>전일 종가</th>
                  <th>안정성</th>
                  {/* <th>가능 한도</th> */}
                </tr>
              </thead>
              {priority !== undefined ? (
                priority.map((stock) => (
                  <tbody>
                    <tr>
                      <td>{stock[6]}</td>
                      <td>{stock[3]}</td>
                      <td>{stock[1]}</td>
                      <td>{stock[8].toLocaleString()}</td>
                      <td>{stock[7]}</td>
                      {/* <td>{(stock[9] * stock[1]).toLocaleString()}</td> */}
                    </tr>
                  </tbody>
                ))
              ) : (
                <div></div>
              )}
            </table>
          </div>
        )}
      </div>
    </BasicModal>
  );
}
