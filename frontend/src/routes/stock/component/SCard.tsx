import styled from "styled-components";
import StockSelectBar from "./StockSelectBar";

interface CardProps {
  index: number;
  stockInfo: //0: id, 1: 계좌번호, 2: 증권사코드, 3: 증권사명, 4: 한도, 5: 담보주수, 6: 보유주수,  7: 등급, 8: 종목코드, 9: 종목명, 10: 전일종가
  [
    number,
    string,
    number,
    number,
    string,
    string,
    string,
    string,
    number,
    number,
    number
  ];
  handleSelectedStock: (index: number, amount: number) => void;
}

interface ColorProps {
  bgColor: string;
}

const colors = [
  "#f7e8bc",
  "#9abade",
  "#f7bcea",
  "#caf7bc",
  "#b2de9a",
  "#de9abd",
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const StyledCard = styled.div<ColorProps>`
  border-radius: 20px;
  padding: 20px;
  width: 316px;
  height: 200px;
  //background-color: #9abade;
  //background-color: ${(props) => props.bgColor}; /* 랜덤 색상을 설정 */
  background-image: url("/images/cardbright.png"); /* 이미지 경로를 설정 */
  background-size: cover;
  //box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease; /* hover 효과 시 부드럽게 변화하도록 설정 */
  margin: 0 10px; /* 카드 사이의 간격을 넓힘 */
`;

export default function SCard({
  index,
  stockInfo,
  handleSelectedStock,
}: CardProps) {
  return (
    <StyledCard bgColor={getRandomColor()}>
      <div className="flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between">
          <p className="font-bold">{stockInfo[5]}</p>
          <p>전일 종가 {stockInfo[9].toLocaleString()}원</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-red-700	">{stockInfo[8]}등급</p>
          <p>총 주수 {stockInfo[2]}주</p>
        </div>
        <div className="flex justify-end gap-3 items-center	">
          <div>주수 선택 </div>
          <div className="w-1/3">
            <StockSelectBar
              index={index}
              count={stockInfo[2]}
              amount={stockInfo[3]}
              handleSelectedStock={handleSelectedStock}
            />
          </div>
        </div>
        <div className="flex flex-row-reverse mt-2">
          <p>총 가격 {(stockInfo[9] * stockInfo[2]).toLocaleString()}원</p>
        </div>
        <div className="flex flex-row-reverse">
          <p>최대 한도 {(stockInfo[10] * stockInfo[2]).toLocaleString()}원</p>
        </div>
        <div className="flex font-thin">
          <p>
            계좌 번호:
            {stockInfo[1]}
          </p>
        </div>
      </div>
    </StyledCard>
  );
}
