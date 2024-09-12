import CollateralRatioCompo from "./CollateralRatioCompo";
import DeclineLogCompo from "./DeclineLogCompo";
import PaymentLogCompo from "./PaymentLogCompo";
import RepaymentLogCompo from "./RepaymentLogCompo";

export default function AdminPage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-between py-5 px-5">
      <div className="w-full flex flex-row justify-between">
        <PaymentLogCompo />
        <CollateralRatioCompo />
      </div>
      <div className="w-full flex flex-row justify-between">
        <RepaymentLogCompo />
        <DeclineLogCompo />
      </div>
    </div>
  );
}
