// import NormalTitle from "../../../components/text/NormalTitle";
// import Slider from "react-slick";
// import styled from "styled-components";
// import StockCard from "./StockCard";

// interface StockProps {
//   stocks: [string, string, number, number, number][];
//   handleSelectedCountList: (index: number, newCount: number) => void;
//   selectedCountList: number[];
// }

// const Wrapper = styled.div`
//   position: relative;
//   margin-left: -5%;
//   margin-right: -5%;

//   .slick-slide {
//     transition: transform 0.3s ease;
//   }
// `;

// //TODO: 선택한 주식 저장하는 로직 저장

// export default function CardList({
//   stocks,
//   handleSelectedCountList,
//   selectedCountList,
// }: StockProps) {
//   const settings = {
//     infinite: false,
//     centerMode: true,
//     centerPadding: "25px",
//     slidesToShow: 1,
//     speed: 500,
//     focusOnSelect: true,
//     dots: true,
//     arrows: false,
//     draggable: true, // 드래그 가능 설정
//     swipe: true, // 터치 제스처 스와이프 설정
//     touchThreshold: 10, // 터치 감도 조정
//   };

//   const cards: [string, string, number, number, number][] = stocks;

//   return (
//     <div className="flex flex-col gap-10">
//       <div>
//         <NormalTitle>신한투자증권</NormalTitle>
//         <Wrapper>
//           <Slider {...settings}>
//             {cards.map((card, index) => (
//               <StockCard
//                 stockId={index}
//                 stockName={card[0]}
//                 stockLevel={card[1]}
//                 stockCount={card[2]}
//                 stockPrice={card[3]}
//                 limit={card[4]}
//                 handleSelectedCountList={handleSelectedCountList}
//                 selected={selectedCountList[index]}
//               />
//             ))}
//           </Slider>
//         </Wrapper>
//       </div>
//     </div>
//   );
// }
