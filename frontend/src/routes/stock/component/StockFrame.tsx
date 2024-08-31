import { useEffect, useState } from "react";
import BoldTitle from "../../../components/text/BoldTitle";
import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import StockModal from "./StockModal";

interface StockProps {
  stocks: [
    string,
    string,
    string,
    string,
    number,
    number,
    number,
    number,
    string
  ][];
  handleTemp: (index: number, amount: number) => void;
}
export default function StockFrame({ stocks, handleTemp }: StockProps) {
  // 0       1      2    3     4        5        6       7     8
  //회사코드, 회사명, 종목명, 등급, 전일종가, 선택한 주수, 전체 주수, 한도, 계좌번호

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
      string,
      string,
      string,
      number,
      number,
      number,
      number,
      string
    ][];
  }>({});

  const handleCategory = (
    arr: [
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number,
      string
    ][]
  ) => {
    const grouped: {
      [key: string]: [
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
      ][];
    } = {};

    arr.forEach((stock, index) => {
      const key = stock[1];
      const newStock: [
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
      <div>
        {Object.entries(category).map(([key, stocks]) => (
          <div>
            <BoldTitle>{key}</BoldTitle>
            <BackgroundFrame color="blue">
              <div className="text-sm">
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "center",
                  }}
                >
                  <thead>
                    <tr>
                      <th>종목명</th>
                      <th>선택한 주수</th>
                      <th>전일 종가</th>
                      <th>등급</th>
                      <th>가능 한도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock, index) =>
                      stock[6] !== 0 ? (
                        <tr
                          key={index}
                          onClick={() =>
                            handleOpenModal(stock[0], stock[6], stock[7])
                          }
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <td>{stock[3]}</td>
                          <td>{stock[6]}</td>
                          <td>{stock[5]}</td>
                          <td>{stock[4]}</td>
                          <td>{stock[8]}</td>
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
