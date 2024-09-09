import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import BoldTitle from "../../../components/text/BoldTitle";

interface PriProps {
  //0: 계좌번호, 1: 담보잡은주수, 2: 종목코드, 3: 종목명, 4: 우선순위,
  //5: 증권사코드, 6: 증권사명, 7: 위험도, 8: 전일종가, 9: 한도
  priority: [
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
  unPriority: [
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
  deletePriority: (
    rowIndex: number,
    clickedRow: [
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
    ]
  ) => void;
}

export default function PriorityFrame({
  priority,
  unPriority,
  deletePriority,
}: PriProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <BoldTitle>우선순위 적용한 담보 주식</BoldTitle>
        <BackgroundFrame color="blue">
          {priority.length !== 0 ? (
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
                    <th>선택 주수</th>
                    {/* <th>전일 종가</th> */}
                    {/* <th>등급</th> */}
                    <th>가능 한도</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {priority.map((stock, rowIndex) => (
                    <tr>
                      <td>{stock[6]}</td>
                      <td>{stock[3]}</td>
                      <td>{stock[1]}</td>
                      {/* <td>{stock[8].toLocaleString()}</td> */}
                      {/* <td>{stock[7]}</td> */}
                      <td>{stock[9]}</td>
                      <td onClick={() => deletePriority(rowIndex, stock)}>-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>아직 우선순위를 설정한 담보 주식이 없습니다.</div>
          )}
        </BackgroundFrame>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <BoldTitle>우선순위 적용하지 않은 주식</BoldTitle>
          <div className="text-xs	text-gray-400">
            우선순위를 정하지 않은 담보주식은 서비스 로직에 따라 정렬됩니다.
          </div>
        </div>

        <BackgroundFrame color="blue">
          {unPriority.length !== 0 ? (
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
                    <th>남은 주수</th>
                    <th>전일 종가</th>
                    {/* <th>등급</th> */}
                    <th>가능 한도</th>
                  </tr>
                </thead>
                <tbody>
                  {unPriority.map((stock) => (
                    <tr>
                      <td>{stock[6]}</td>
                      <td>{stock[3]}</td>
                      <td>{stock[1]}</td>
                      <td>{stock[8].toLocaleString()}</td>
                      {/* <td>{stock[7]}</td> */}
                      <td>{stock[9].toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>우선순위를 설정하지 않은 담보 주식이 없습니다.</div>
          )}
        </BackgroundFrame>
      </div>
    </div>
  );
}
