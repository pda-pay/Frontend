interface DeclineLogProps {
  userId: string;
  mortgaged: number;
  limit: number;
  declineRatio: number;
}

export default function DeclineLog(props: DeclineLogProps) {
  return (
    <div className="grid grid-cols-5 gap-3 text-center items-center border-solid border">
      <p>{props.userId}</p>
      <p>
        {props.mortgaged.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
      </p>
      <p>{props.limit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
      <p>{(props.mortgaged / props.limit) * 100}%</p>
      <p>{props.declineRatio}%</p>
    </div>
  );
}
