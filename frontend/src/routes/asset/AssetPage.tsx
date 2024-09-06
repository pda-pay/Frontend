import StockPieChart from "./StockPieChart";

export default function AssetPage() {
  return (
    <div
      style={{ backgroundColor: "#9abade33" }}
      className="w-screen h-screen p-5 py-7 flex flex-col"
    >
      <p className="text-lg">
        <strong className="font-bold">정윤현님,</strong>자산 현황을 확인해보세요
      </p>
      <StockPieChart />
    </div>
  );
}
