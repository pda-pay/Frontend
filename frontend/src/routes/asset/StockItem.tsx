export interface StockItemProps {
  companyName: string;
  name: string;
  amount: number;
  mortgaged: boolean;
}

export default function StockItem(props: StockItemProps) {
  return (
    <div
      className={`${
        props.mortgaged ? "bg-amber-100" : "bg-slate-200"
      } rounded-lg
      px-4
      flex
      flex-col
      items-center
      `}
    >
      <div className="flex flex-row items-center justify-between space-y-1">
        <img
          className="h-5"
          src={`/public/companyLogo/${props.companyName}.png`}
        />
        <p className="text-base">{props.companyName}</p>
      </div>
      <div className="flex flex-row justify-between text-sm w-full max-w-[120px] truncate">
        <p className="truncate">{props.name}</p>
        <p>{props.amount}주</p>
      </div>
    </div>
  );
}
