import { useState } from "react";
import ButtonBar from "../../components/button/ButtonBar";
import QuestionButton from "../../components/button/QuestionButton";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import CardList from "./component/CardList";
import BasicModal from "../../components/modal/BasicModal";
import XButton from "../../components/button/XButton";
import StockLevelModal from "./component/StockLevelModal";

export default function StockCheckPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            // <BasicModal isOpen={isModalOpen} onRequestClose={closeModal}>
            //   <div className="flex flex-row-reverse" onClick={closeModal}>
            //     <XButton />
            //   </div>
            //   <h2>주식 등급 안내</h2>
            //   <p>A등급 ~</p>
            // </BasicModal>
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
