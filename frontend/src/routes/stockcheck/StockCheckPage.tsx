import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBar from "../../components/button/ButtonBar";
import QuestionButton from "../../components/button/QuestionButton";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import CardList from "./component/CardList";
import StockLevelModal from "./component/StockLevelModal";
import MoveButton from "../../components/button/MoveButton";

export default function StockCheckPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //TODO: 이거 백엔드에서 받아온 증권 정보들
  //종목명, 등급, 보유주수, 전일종가, 최대한도
  const stocks: [string, string, number, number, number][] = [
    ["삼성전자", "A", 30, 70000, 1200000],
    ["엘지전자", "A", 50, 50000, 1200000],
    ["하이닉스", "A", 40, 80000, 1200000],
    ["종근당", "A", 20, 20000, 1200000],
    ["현대오토에버", "A", 20, 60000, 1200000],
  ];

  let totalLimit = 0;
  for (let i = 0; i < stocks.length; i++) {
    totalLimit += stocks[i][4];
  }

  //TODO: 주식 자동 선택 api 요청 보내기
  const autoSelect = () => {
    navigate("/selectedstock");
  };

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

      <CardList stocks={stocks} />

      <div>
        <div className="mb-5">
          <div className="flex justify-between mb-5">
            <BoldTitle>
              확보 가능한 최대 한도: <br />
              {totalLimit} 원
            </BoldTitle>
            <MoveButton
              onClick={() => {
                navigate("/selectedstock");
              }}
            >
              선택한 주식 보기
            </MoveButton>
          </div>
          {/*이거 클릭 시에 api 요청 보내고 선택된 값 받아와서 selected stock 페이지 띄우기*/}
          <div onClick={autoSelect} className="text-sm	text-blue-700">
            원하는 한도에 맞게 주식을 자동으로 선택해주세요.
          </div>
        </div>

        <ButtonBar
          beforetext="이전"
          nexttext="다음"
          beforeurl="/serviceagree"
          nexturl="/priority"
        ></ButtonBar>
      </div>
    </PaddingDiv>
  );
}
