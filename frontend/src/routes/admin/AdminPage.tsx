import CollateralRatioCompo from "./CollateralRatioCompo";
import PaymentLogCompo from "./PaymentLogCompo";

export default function AdminPage() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="grid grid-cols-2 gap-5 mb-20">
        <PaymentLogCompo />
        <CollateralRatioCompo />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <PaymentLogCompo />
        <PaymentLogCompo />
      </div>
    </div>
  );
}
