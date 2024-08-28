import ButtonBar from "../../components/button/ButtonBar";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";

export default function SelectedStockPage() {
  return (
    <PaddingDiv>
      this is selected stock page!
      <ButtonBar
        beforetext="이전"
        nexttext="완료"
        beforeurl="/stockcheck"
        nexturl="/priority"
      />
    </PaddingDiv>
  );
}
