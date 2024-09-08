interface RepaymentLogProps {
  id: number;
  customerId: string;
  amount: number;
  accountNumber: string;
  type: string;
  date: string;
}

export default function RepaymentLog(props: RepaymentLogProps) {
  return (
    <div className="grid grid-cols-6 gap-3 text-center items-center border-solid border">
      <p>{props.id}</p>
      <p>{props.customerId}</p>
      <p>{props.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
      <p>{props.accountNumber}</p>
      <p>{props.type}</p>
      <p>{props.date}</p>
    </div>
  );
}
