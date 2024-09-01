import { useLocation } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";

export default function SettingLimitPage() {
  const location = useLocation();

  //TODO: 아마 로그인시 유저 정보를 id와 이름을 보내줄거니까 배열에 저장해두고 사용
  const userInfo: [number, string] = [111, "정윤현"];

  const { selectedStock } = location.state as {
    selectedStock: [
      string, //0: 증권사 코드
      string, //1: 증권사명
      string, //2: 종목명
      string, //3: 등급
      number, //4: 전일종가
      number, //5: 선택한 주수
      number, //6: 전체 주수
      number, //7: 한도
      string //8: 계좌번호
    ][];
  };

  const { priorityStock } = location.state as {
    priorityStock: [
      number, //0: id
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
  };

  console.log("prioritystock은 ");
  console.log(priorityStock);

  return (
    <PaddingDiv>
      <BoldTitle>한도를 설정해보세요.</BoldTitle>
    </PaddingDiv>
  );
}
