import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";

interface StockProps {
  stockList?: [number, string, string, number, number, number][];
}

export default function StockGroup({ stockList }: StockProps) {
  return (
    <BackgroundFrame color="blue">
      <div className="text-sm">
        종목명 | 선택한 주수 | 전일 종가 | 등급 | 가능 한도
        <hr />
        <div>
          {stockList ? (
            stockList.map((item, index) => (
              // key 속성에 고유한 값을 사용하여 각 요소에 고유 식별자를 할당합니다.
              <div key={index}>
                {item[1]} | {item[3]} | {item[4]} | {item[2]} |{item[5]}
              </div>
            ))
          ) : (
            <div>No data available</div> // data가 undefined일 때 보여줄 대체 내용
          )}
        </div>
      </div>
    </BackgroundFrame>
  );
}
