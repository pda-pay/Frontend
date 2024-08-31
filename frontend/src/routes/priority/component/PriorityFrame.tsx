import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import BoldTitle from "../../../components/text/BoldTitle";

interface PriProps {
  priority: [
    number, //0: 인덱스
    string, //1: 증권사 코드
    string, //2: 증권사명
    string, //3: 종목명
    string, //4: 등급
    number, //5: 전일종가
    number, //6: 우선순위로 고른 주수
    number, //7: 담보로 잡은 전체 주수
    number, //8: 한도
    string //9: 계좌 번호
  ][];
  unPriority: [
    number, //0: 인덱스
    string, //1: 증권사 코드
    string, //2: 증권사명
    string, //3: 종목명
    string, //4: 등급
    number, //5: 전일종가
    number, //6: 우선순위로 남은 주수
    number, //7: 담보로 잡은 전체 주수
    number, //8: 한도
    string //9: 계좌 번호
  ][];
}

export default function PriorityFrame({ priority, unPriority }: PriProps) {
  return (
    <div>
      <BoldTitle>우선순위 적용한 담보 주식</BoldTitle>
      <div className="text-sm	text-gray-400">
        종목을 클릭해서 주수 수정이 가능합니다.
      </div>
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
                  <th>남은 주수</th>
                  <th>전일 종가</th>
                  <th>등급</th>
                  <th>가능 한도</th>
                </tr>
              </thead>
              <tbody>
                {priority.map((stock, index) => (
                  <tr>
                    <td>{stock[2]}</td>
                    <td>{stock[3]}</td>
                    <td>{stock[6]}</td>
                    <td>{stock[5]}</td>
                    <td>{stock[4]}</td>
                    <td>{stock[8]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>아직 우선순위를 설정한 담보 주식이 없습니다.</div>
        )}
      </BackgroundFrame>

      <BoldTitle>우선순위 적용하지 않은 주식</BoldTitle>
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
                  <th>등급</th>
                  <th>가능 한도</th>
                </tr>
              </thead>
              <tbody>
                {unPriority.map((stock, index) => (
                  <tr>
                    <td>{stock[2]}</td>
                    <td>{stock[3]}</td>
                    <td>{stock[6]}</td>
                    <td>{stock[5]}</td>
                    <td>{stock[4]}</td>
                    <td>{stock[8]}</td>
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
  );
}
