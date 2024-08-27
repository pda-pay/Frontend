import { useState } from "react";
import ButtonBar from "../../components/button/ButtonBar";
import QuestionButton from "../../components/button/QuestionButton";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import CardList from "./component/CardList";
import StockLevelModal from "./component/StockLevelModal";

export default function StockCheckPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <PaddingDiv>
      <div className="flex justify-between">
        <BoldTitle>담보로 잡을 주식을 선택해주세요.</BoldTitle>
        <div>
          <div onClick={openModal}>
            <QuestionButton />
          </div>
          {isModalOpen && (
            <StockLevelModal
              isModalOpen={isModalOpen}
              handleCloseModal={closeModal}
            />
          )}
        </div>
      </div>

      <CardList></CardList>
      <ButtonBar
        beforetext="이전"
        nexttext="다음"
        beforeurl="/serviceagree"
        nexturl="/"
      ></ButtonBar>
    </PaddingDiv>
  );
}
