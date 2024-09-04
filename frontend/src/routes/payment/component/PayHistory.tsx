//import { useState } from "react";
import BackgroundFrame from "../../../components/backgroundframe/BackgroundFrame";
//import paymentAPI from "../../../api/paymentAPI";

interface PayInfo {
  userInfo: [string, string, boolean];
}
export default function PayHistory({ userInfo }: PayInfo) {
  //const paymentservice = new paymentAPI();

  //TODO: 여기서 api 호출해서 내역 가져오기
  // const [paymentAccount, setPaymentAccount] = useState<number>(0);
  // const [creditLimit, setCreditLimit] = useState<number>(0);
  // const [accountDeposit, setAccountDeposit] = useState<number>(0);
  // const [paymentHistory, setPaymentHistory] = useState<
  //   [number, number, string, string][]
  // >([]);

  // const updatePaymentInfo = async () => {
  //   try {
  //     const response = await paymentservice.getPaymentInfo({
  //       userId: userInfo[1],
  //     })
  //   }
  // }

  return (
    <BackgroundFrame color="white">
      <div>이건 결제 내역 확인 컴포넌트</div>
    </BackgroundFrame>
  );
}
