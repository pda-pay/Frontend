import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";

interface ModalProps {
  priority?: [
    number,
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
  mortgage?: [
    string, // "accountNumber": "456-7890-12345",
    number, //         "quantity": 250,
    number, //         "mortgagedQuantity": 0,
    string, //         "stockCode": "005930",
    string, //         "stockName": "삼성전자",
    string, //         "companyCode": "04",
    string, //         "companyName": "삼성증권",
    number, //         "stabilityLevel": 1,
    number, //         "stockPrice": 74300,
    number //         "limitPrice": 48295.0
  ][];
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

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
          <div className="text-xs">
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
                  <th>등급</th>
                  <th>가능 한도</th>
                </tr>
              </thead>
              {mortgage.map((stock) => (
                <tbody>
                  <tr>
                    <td>{stock[6]}</td>
                    <td>{stock[4]}</td>
                    <td>{stock[2]}</td>
                    <td>{stock[8]}</td>
                    <td>{stock[7]}</td>
                    <td>{stock[9] * stock[2]}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        ) : (
          <div className="text-xs">
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
                  <th>등급</th>
                  <th>가능 한도</th>
                </tr>
              </thead>
              {priority !== undefined ? (
                priority.map((stock) => (
                  <tbody>
                    <tr>
                      <td>{stock[6]}</td>
                      <td>{stock[4]}</td>
                      <td>{stock[2]}</td>
                      <td>{stock[8]}</td>
                      <td>{stock[7]}</td>
                      <td>{stock[9] * stock[2]}</td>
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
