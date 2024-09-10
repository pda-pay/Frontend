export interface CollateralCompoProps {
  customerId: string;
  mortgaged: number;
  limit: number;
  ratio: number;
}

export default function CollateralCompo(props: CollateralCompoProps) {
  return (
    <div
      className={`grid grid-cols-4 gap-3 text-center items-center border-solid border
        ${
          props.ratio >= 155
            ? "bg-white"
            : props.ratio >= 140
            ? "bg-orange-500"
            : "bg-red-500"
        }`}
    >
      <p>{props.customerId}</p>
      <p>
        {props.mortgaged.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
      </p>
      <p>{props.limit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
      <p>{props.ratio}%</p>
    </div>
  );
}
