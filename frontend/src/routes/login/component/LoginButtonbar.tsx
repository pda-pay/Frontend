import ButtonBar from "../../../components/button/ButtonBar";
export default function LoginButtonbar() {
  return (
    <ButtonBar
      nexttext="다음"
      beforetext="이전"
      nexturl="/"
      beforeurl="/"
      nextdisabled={false}
      beforedisabled={false}
    />
  );
}
