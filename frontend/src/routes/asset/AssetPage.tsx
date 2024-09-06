import MortgageState from "./MortgageState";
import StockPieChart from "./StockPieChart";

export default function AssetPage() {
  return (
    <div
      style={{ backgroundColor: "#9abade33" }}
      className="w-screen p-5 pt-7 pb-20 flex flex-col"
    >
      <p className="text-lg">
        <strong className="font-bold">정윤현님,</strong>자산 현황을 확인해보세요
      </p>
      <StockPieChart />

      <MortgageState />
    </div>
  );
}
