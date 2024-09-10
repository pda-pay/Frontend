import { StockInfo } from "./MortgageState";

interface StockDetailModalProps {
  stockInfo: StockInfo[];
}

export default function StockDetailModal(props: StockDetailModalProps) {
  return (
    <div className="bg-white h-full">
      <div className="grid grid-cols-6 gap-1 text-[10px] mb-3">
        <p className="col-span-1 truncate">증권사</p>
        <p className="col-span-1 truncate">종목명</p>
        <p className="col-span-1 truncate">주수</p>
        <p className="col-span-1 truncate">현재가</p>
        <p className="col-span-1 truncate">안정성</p>
        <p className="col-span-1 truncate">한도</p>
      </div>

      {props.stockInfo.map((value, index) => {
        return (
          <div className="grid grid-cols-6 gap-1 text-[10px]" key={index}>
            <img
              src={`/public/companyLogo/${value.companyName}.png`}
              className="w-5 h-auto"
              alt={`${value.companyName} logo`}
            />
            <p className="col-span-1 truncate">{value.name}</p>
            <p className="col-span-1 truncate">{value.amount}</p>
            <p className="col-span-1 truncate">
              {value.stockPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p className="col-span-1 truncate">{value.stabilityLevel}</p>
            <p className="col-span-1 truncate">
              {value.limitPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
        );
      })}
    </div>
  );
}
