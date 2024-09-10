import { useState } from "react";
import { MyStockData, StockInfo } from "./MortgageState";
import StockDetailModal from "./StockDetailModal";
import StockItem from "./StockItem";
import BasicModal from "../../components/modal/BasicModal";

export default function StockSeperator(props: MyStockData) {
  const [modalData, setModaData] = useState<StockInfo[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onClickMore = (data: StockInfo[]) => {
    setModaData(data);
    setShowModal(true);
  };

  return (
    <div className="pt-5 pb-3 bg-white rounded-lg">
      <BasicModal
        isOpen={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <StockDetailModal stockInfo={modalData} />
      </BasicModal>

      <div className="cursor-default grid grid-cols-2 p-2 text-center font-bold">
        <p>담보로 잡은 주식</p>
        <p>담보로 잡지 않은 주식</p>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] p-4 bg-white rounded-lg p-2 h-[20vh] overflow-y-auto">
        <div className="space-y-2">
          {props.mortgaged.map((value, index) => {
            return (
              <StockItem
                amount={value.amount}
                companyName={value.companyName}
                name={value.name}
                mortgaged={value.mortgaged}
                key={index}
              />
            );
          })}
        </div>
        <div className="border-l border-gray-400 h-full mx-2"></div>
        <div className="space-y-2">
          {props.free.map((value, index) => {
            return (
              <StockItem
                amount={value.amount}
                companyName={value.companyName}
                name={value.name}
                mortgaged={value.mortgaged}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-around font-bold">
        <span
          onClick={() => {
            onClickMore(props.mortgaged);
          }}
          className="cursor-pointer"
        >
          더보기
        </span>
        <span
          onClick={() => {
            onClickMore(props.free);
          }}
          className="cursor-pointer"
        >
          더보기
        </span>
      </div>
    </div>
  );
}
