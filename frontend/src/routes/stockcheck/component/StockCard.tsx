import { useEffect, useState } from "react";
import styled from "styled-components";
import SelectStockBar from "./SelectStockBar";

interface CardProps {
  stockName: string;
  stockLevel: string;
  stockPrice: number;
  stockCount: number;
  limit: number;
  //children: React.ReactNode;
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

export default function StockCard({
  stockName,
  stockLevel,
  stockPrice,
  stockCount,
  limit,
}: CardProps) {
  //TODO: 로직 확인 필요
  // useEffect(() => {
  //   handleSelectedStock(selected);
  // }, [selected]);

  //TODO: selectedstockbar에서 변경 사항이 생기면 handleSelected를 사용해서 selected 업데이트
  //selected가 업데이트가 완전히 끝나면 그때서야 handleSelectedStock 호출

  return (
    <StyledCard bgColor={getRandomColor()}>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <p className="font-bold">{stockName}</p>{" "}
          <p>전일 종가 {stockPrice}원</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-red-700	">{stockLevel}등급</p>{" "}
          <p>총 주수 {stockCount}주</p>
        </div>
        <div className="flex justify-end gap-3 items-center	">
          <div>주수 선택 </div>
          <div className="w-1/3">
            <SelectStockBar count={stockCount} />
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <p>총 가격 {stockCount * stockPrice}원</p>
        </div>
        <div className="flex flex-row-reverse">
          <p>확보 가능한 최대 한도 {limit}원</p>
        </div>
      </div>
    </StyledCard>
  );
}
