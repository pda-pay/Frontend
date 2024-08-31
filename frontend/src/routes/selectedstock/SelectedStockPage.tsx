// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import ButtonBar from "../../components/button/ButtonBar";
// import PaddingDiv from "../../components/settingdiv/PaddingDiv";
// import NormalTitle from "../../components/text/NormalTitle";
// import StockGroup from "./component/StockGroup";

// export default function SelectedStockPage() {
//   const location = useLocation();

//   const { selectedStock } = location.state as {
//     selectedStock: [string, string, number, number, number][];
//   };

//   const { stocks } = location.state as {
//     stocks: [string, string, number, number, number][];
//   };

//   useEffect(() => {
//     console.log(selectedStock);
//   }, [selectedStock]);

//   const [updatedStock, setUpdatedStock] =
//     useState<[string, string, number, number, number][]>(selectedStock);

//   const [nowLimit, setNowLimit] = useState<number>(0);

//   const updateNowLimit = () => {
//     let totalLimit = 0;
//     for (let i = 0; i < selectedStock.length; i++) {
//       if (selectedStock[i][2] != 0) {
//         totalLimit += selectedStock[i][4] * selectedStock[i][2];
//       }
//     }
//     setNowLimit(totalLimit);
//   };

//   useEffect(() => {
//     updateNowLimit();
//   }, [updatedStock]);

//   //선택한 주식 리스트 업데이트
//   const updatedUpdatedStock = (index: number, value: number) => {
//     const tempRow: [string, string, number, number, number] = [
//       updatedStock[index][0],
//       updatedStock[index][1],
//       value,
//       updatedStock[index][3],
//       updatedStock[index][4],
//     ];

//     const tempArr: [string, string, number, number, number][] = [
//       ...updatedStock.slice(0, index),
//       tempRow,
//       ...updatedStock.slice(index + 1),
//     ];
//     setUpdatedStock(tempArr);
//   };

//   const handleUpdatedStock = (index: number, value: number) => {
//     updatedUpdatedStock(index, value);
//   };

//   useEffect(() => {
//     console.log("업데이트된 주식 리스트 ");
//     console.log(updatedStock);
//   }, [updatedStock]);
//   return (
//     <PaddingDiv>
//       <NormalTitle>
//         현재 확보한 총 한도는
//         <span className="font-bold text-blue-700"> {nowLimit}원</span> 입니다.
//         <div className="text-sm	text-gray-400">
//           종목을 클릭하면 주수 조절이 가능합니다.
//         </div>
//       </NormalTitle>
//       <div className="flex flex-col">
//         <div>
//           <StockGroup
//             originalStock={stocks}
//             stockList={updatedStock}
//             handleUpdatedStock={handleUpdatedStock}
//           />
//         </div>
//       </div>
//       <ButtonBar
//         beforetext="이전"
//         nexttext="완료"
//         beforeurl="/stockcheck"
//         beforestate={{ gotStock: selectedStock }}
//         nexturl="/stockcheck"
//         nextstate={{ gotStock: updatedStock }}
//       />
//     </PaddingDiv>
//   );
// }
