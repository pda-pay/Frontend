import { useState } from "react";
import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
import BoldTitle from "../../../components/text/BoldTitle";
import StockEditModal from "../../stockcheck/component/StockEditModal";

interface StockProps {
  originalStock: [string, string, number, number, number][];
  stockList: [string, string, number, number, number][];
  handleUpdatedStock: (index: number, value: number) => void;
}

export default function StockGroup({
  originalStock,
  stockList,
  handleUpdatedStock,
}: StockProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clickedValue, setClickedValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [nowIndex, setNowIndex] = useState<number>(0);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const updateStockList = (index: number, value: number) => {
    handleUpdatedStock(index, value);
  };

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
        <BoldTitle>선택한 주식</BoldTitle>
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
                {stockList ? (
                  stockList.map((item, index) =>
                    item[2] != 0 ? (
                      <tr
                        key={index}
                        onClick={() =>
                          handleOpenModal(
                            index,
                            item[2],
                            originalStock[index][2]
                          )
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <td>{item[0]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[1]}</td>
                        <td>{item[4]}</td>
                        <div></div>
                      </tr>
                    ) : (
                      <div></div>
                    )
                  )
                ) : (
                  <div>아무것도 없어요!</div>
                )}
              </tbody>
            </table>
          </div>
        </BackgroundFrame>
      </div>
      <div>
        <BoldTitle>선택 안 한 주식</BoldTitle>
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
                {stockList ? (
                  stockList.map((item, index) =>
                    item[2] == 0 ? (
                      <tr
                        key={index}
                        //onClick={() => updateStockList(index, item[2])}
                        onClick={() =>
                          handleOpenModal(
                            index,
                            item[2],
                            originalStock[index][2]
                          )
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <td>{item[0]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[1]}</td>
                        <td>{item[4]}</td>
                      </tr>
                    ) : (
                      <div></div>
                    )
                  )
                ) : (
                  <div>아무것도 없어요!</div>
                )}
              </tbody>
            </table>
          </div>
        </BackgroundFrame>
      </div>
      {isModalOpen && (
        <StockEditModal
          index={nowIndex}
          value={clickedValue}
          max={maxValue}
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          updateStockList={updateStockList}
        />
      )}
    </div>
  );
}
