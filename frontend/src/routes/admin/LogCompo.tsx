interface LogCompoProps {
  id: number;
  customerId: string;
  amount: number;
  franchiseCode: number;
  isSuccess: string;
  date: string;
}

export default function LogCompo(props: LogCompoProps) {
  return (
    <div className="grid grid-cols-6 gap-3 text-center items-center border-solid border">
      <p>{props.id}</p>
      <p>{props.customerId}</p>
      <p>{props.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
      <p>{props.franchiseCode}</p>
      <p>{props.isSuccess}</p>
      <p>{props.date}</p>
    </div>
  );
}
