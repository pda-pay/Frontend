import { useEffect, useState } from "react";
import BoldTitle from "../../../components/text/BoldTitle";
import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import StockModal from "./StockModal";

interface StockProps {
  stocks: [
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
  ][];
  handleTemp: (index: number, amount: number) => void;
}
export default function StockFrame({ stocks, handleTemp }: StockProps) {
  //0: 계좌번호, 1: 증권사코드, 2: 증권사명, 3: 한도, 4: 담보주수, 5: 보유주수,  6: 등급, 7: 종목코드, 8: 종목명, 9: 전일종가

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clickedValue, setClickedValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [nowIndex, setNowIndex] = useState<number>(0);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [category, setCategory] = useState<{
    [key: string]: [
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
    ][];
  }>({});

  const handleCategory = (
    arr: [
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
    ][]
  ) => {
    const grouped: {
      [key: string]: [
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
      ][];
    } = {};

    arr.forEach((stock, index) => {
      const key = stock[6];
      const newStock: [
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
      ] = [index, ...stock];

      //이미 해당 증권사 그룹이 생성돼있다면,
      if (grouped[key]) {
        grouped[key].push(newStock);
      } else {
        grouped[key] = [newStock];
      }
    });

    return grouped;
  };
  useEffect(() => {
    setCategory(handleCategory(stocks));
  }, [stocks]);

  useEffect(() => {
    console.log("잘 필터링되는지 확인");
    console.log(category);
  }, [category]);

  const handleOpenModal = (index: number, value: number, max: number) => {
    setClickedValue(value);
    setMaxValue(max);
    setNowIndex(index);
    openModal();
  };

  const handleCloseModal = () => {
    setClickedValue(0);
    setMaxValue(0);
    setNowIndex(0);
    closeModal();
  };

  return (
    <div>
      <div className="flex flex-col gap-10">
        {Object.entries(category).map(([key, stocks]) => (
          <div>
            <BoldTitle>{key}</BoldTitle>
            <BackgroundFrame color="blue">
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
                      <th style={{ textAlign: "left" }}>종목명</th>
                      <th>계좌</th>
                      <th>담보 주수</th>
                      <th>전일 종가</th>
                      {/* <th>등급</th> */}
                      <th>가능 한도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock, index) =>
                      stock[3] !== 0 ? (
                        <tr
                          key={index}
                          onClick={() =>
                            handleOpenModal(stock[0], stock[3], stock[2])
                          }
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <td style={{ textAlign: "left" }}>{stock[5]}</td>
                          <td>{stock[1].slice(0, 3)}</td>
                          <td>{stock[3]}</td>
                          <td>{stock[9].toLocaleString()}원</td>
                          {/* <td>{stock[8]}</td> */}
                          <td>{stock[10].toLocaleString()}원</td>
                          <div></div>
                        </tr>
                      ) : (
                        <div></div>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </BackgroundFrame>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <StockModal
          index={nowIndex}
          amount={clickedValue}
          max={maxValue}
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          handleTemp={handleTemp}
        />
      )}
    </div>
  );
}
