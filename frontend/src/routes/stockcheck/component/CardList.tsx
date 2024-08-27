import NormalTitle from "../../../components/text/NormalTitle";
import Slider from "react-slick";
import styled from "styled-components";
import StockCard from "./StockCard";

const Wrapper = styled.div`
  position: relative;
  //width: 105%;
  margin-left: -5%; /* 중앙에 맞추기 위해 좌측으로 이동 */
  margin-right: -5%; /* 필요시 우측으로도 이동 */
  //margin: 0 auto;

  .slick-list {
    padding: 0 80px;
  }

  .slick-slide {
    transition: transform 0.3s ease;
  }

  .slick-current {
    //transform: scale(1.1);
  }
`;

export default function CardList() {
  const settings = {
    infinite: true,
    centerMode: true,
    centerPadding: "25px",
    slidesToShow: 1,
    speed: 500,
    focusOnSelect: true,
    dots: true,
    arrows: false,
    draggable: true, // 드래그 가능 설정
    swipe: true, // 터치 제스처 스와이프 설정
    touchThreshold: 10, // 터치 감도 조정
  };

  const cards: [string, string, number, number, number][] = [
    ["삼성전자", "A", 30, 70000, 1200000],
    ["엘지전자", "A", 50, 50000, 1200000],
    ["하이닉스", "A", 40, 80000, 1200000],
    ["종근당", "A", 20, 20000, 1200000],
    ["현대오토에버", "A", 20, 60000, 1200000],
  ];

  return (
    <div>
      <NormalTitle>신한투자증권</NormalTitle>

      <Wrapper>
        <Slider {...settings}>
          {cards.map((card, index) => (
            <StockCard
              stockName={card[0]}
              stockLevel={card[1]}
              stockCount={card[2]}
              stockPrice={card[3]}
              limit={card[4]}
            />
          ))}
        </Slider>
      </Wrapper>
    </div>
  );
}
