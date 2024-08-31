// import { useCallback, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import ButtonBar from "../../components/button/ButtonBar";
// import QuestionButton from "../../components/button/QuestionButton";
// import PaddingDiv from "../../components/settingdiv/PaddingDiv";
// import BoldTitle from "../../components/text/BoldTitle";
// import CardList from "./component/CardList";
// import StockLevelModal from "./component/StockLevelModal";
// import MoveButton from "../../components/button/MoveButton";

// export default function StockCheckPage() {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   //TODO: 이거 백엔드에서 받아온 증권 정보들
//   //종목명, 등급, 보유주수, 전일종가, 단위별 가능한도
//   const stocks: [string, string, number, number, number][] = [
//     ["삼성전자", "A", 30, 70000, 12000],
//     ["엘지전자", "A", 50, 50000, 12000],
//     ["하이닉스", "A", 40, 80000, 12000],
//     ["종근당", "A", 20, 20000, 12000],
//     ["현대오토에버", "A", 20, 60000, 12000],
//   ];
//   const [selectedCountList, setSelectedCountList] = useState<number[]>(() =>
//     Array(stocks.length).fill(0)
//   );
//   const [selectedStock, setSelectedStock] = useState<
//     [string, string, number, number, number][]
//   >([...stocks]);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   //선택주수 배열 업데이트
//   const handleSelectedCountList = (index: number, newCount: number) => {
//     setSelectedCountList((prevArray) => [
//       ...prevArray.slice(0, index),
//       newCount,
//       ...prevArray.slice(index + 1),
//     ]);
//   };

//   const updateSelectedStock = useCallback(() => {
//     setSelectedStock((/*prevSelectedStock*/) => {
//       const updatedSelectedStock = selectedStock.map((prevRow, index) => {
//         const updateRow: [string, string, number, number, number] = [
//           ...prevRow,
//         ];
//         updateRow[2] = selectedCountList[index];
//         return updateRow;
//       });
//       return updatedSelectedStock;
//     });
//   }, [selectedCountList]);

//   useEffect(() => {
//     updateSelectedStock();
//   }, [updateSelectedStock]);

//   //TODO: 주식 자동 선택 api 요청 보내기
//   //아닌가? 내가 하는건가?
//   const autoSelect = () => {
//     navigate("/selectedstock");
//   };

//   //상태 넘겨주고
//   const moveToSelectedPage = () => {
//     navigate("/selectedstock", {
//       state: { selectedStock: selectedStock, stocks: stocks },
//     });
//   };

//   //상태 받기
//   const location = useLocation();

//   useEffect(() => {
//     if (location.state) {
//       const { gotStock } = location.state as {
//         gotStock: [string, string, number, number, number][];
//       };

//       const { priorityToCheck } = location.state as {
//         priorityToCheck: [string, string, number, number, number][];
//       };

//       if (gotStock && Array.isArray(gotStock)) {
//         gotStock.map((row, index) => {
//           handleSelectedCountList(index, row[2]);
//         });
//       }

//       if (priorityToCheck && Array.isArray(priorityToCheck)) {
//         priorityToCheck.map((row, index) => {
//           handleSelectedCountList(index, row[2]);
//         });
//       }
//     }
//   }, [location.state]);

//   useEffect(() => {
//     console.log(selectedStock);
//   }, [selectedStock]);

//   let totalLimit = 0;
//   for (let i = 0; i < stocks.length; i++) {
//     totalLimit += stocks[i][4] * stocks[i][2];
//   }

//   return (
//     <PaddingDiv>
//       <div className="flex justify-between">
//         <BoldTitle>담보로 잡을 주식을 선택해주세요.</BoldTitle>
//         <div>
//           <div onClick={openModal}>
//             <QuestionButton />
//           </div>
//           {isModalOpen && (
//             <StockLevelModal
//               isModalOpen={isModalOpen}
//               handleCloseModal={closeModal}
//             />
//           )}
//         </div>
//       </div>

//       <CardList
//         stocks={stocks}
//         handleSelectedCountList={handleSelectedCountList}
//         selectedCountList={selectedCountList}
//       />

//       <div>
//         <div className="mb-5">
//           <div className="flex justify-between mb-5">
//             <BoldTitle>
//               현재 확보 가능한 최대 한도: <br />
//               {totalLimit} 원
//             </BoldTitle>
//             <MoveButton
//               onClick={() => {
//                 moveToSelectedPage();
//               }}
//             >
//               선택한 주식 보기
//             </MoveButton>
//           </div>
//           {/*이거 클릭 시에 api 요청 보내고 선택된 값 받아와서 selected stock 페이지 띄우기*/}
//           <div onClick={autoSelect} className="text-sm	text-blue-700">
//             원하는 한도에 맞게 주식을 자동으로 선택해주세요.
//           </div>
//         </div>

//         <ButtonBar
//           beforetext="이전"
//           nexttext="다음"
//           beforeurl="/serviceagree"
//           nexturl="/priority"
//           nextstate={{ selectedStock: selectedStock, stocks: stocks }}
//         ></ButtonBar>
//       </div>
//     </PaddingDiv>
//   );
// }
