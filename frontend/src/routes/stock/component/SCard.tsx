import styled from "styled-components";
import StockSelectBar from "./StockSelectBar";

interface CardProps {
  index: number;
  stockInfo: [
    number,
    string,
    string,
    string,
    string,
    number,
    number,
    number,
    number,
    string
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
  background-color: ${(props) => props.bgColor}; /* 랜덤 색상을 설정 */
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  margin: 0 10px; /* 카드 사이의 간격을 넓힘 */
`;

export default function SCard({
  index,
  stockInfo,
  handleSelectedStock,
}: CardProps) {
  return (
    //회사코드, 회사명, 종목명, 등급, 전일종가, 선택한 주수, 전체 주수, 한도, 계좌번호
    <StyledCard bgColor={getRandomColor()}>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <p className="font-bold">{stockInfo[3]}</p>{" "}
          <p>전일 종가 {stockInfo[5]}원</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-red-700	">{stockInfo[4]}등급</p>
          <p>총 주수 {stockInfo[7]}주</p>
        </div>
        <div className="flex justify-end gap-3 items-center	">
          <div>주수 선택 </div>
          <div className="w-1/3">
            <StockSelectBar
              index={index}
              count={stockInfo[7]}
              amount={stockInfo[6]}
              handleSelectedStock={handleSelectedStock}
            />
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <p>총 가격 {stockInfo[5] * stockInfo[7]}원</p>
        </div>
        <div className="flex flex-row-reverse">
          <p>확보 가능한 최대 한도 {stockInfo[8] * stockInfo[7]}원</p>
        </div>
      </div>
    </StyledCard>
  );
}
