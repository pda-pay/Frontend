import ButtonBar from "../../components/button/ButtonBar";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen p-5 flex flex-col justify-between">
      <div>this is loginpage! hi~</div>
      <div>
        <ButtonBar
          nexttext="다음"
          beforetext="이전"
          nexturl="/"
          beforeurl="/"
          nextdisabled={false}
          beforedisabled={false}
        />
      </div>
    </div>
  );
}
