import Slider from "react-slick";
import styled from "styled-components";
import NormalTitle from "../../../components/text/NormalTitle";
import SCard from "./SCard";

interface StockProps {
  stocks: {
    [key: string]: [
      number,
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number,
      string
    ][];
  };
  handleSelectedStock: (index: number, amount: number) => void;
}

const Wrapper = styled.div`
  position: relative;
  margin-left: -5%;
  margin-right: -5%;

  .slick-slide {
    transition: transform 0.3s ease;
  }
`;

export default function OwnStockList({
  stocks,
  handleSelectedStock,
}: StockProps) {
  const settings = {
    infinite: false,
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

  return (
    <div className="flex flex-col gap-10">
      <div>
        {Object.entries(stocks).map(([key, values]) => (
          <div>
            <NormalTitle>{key}</NormalTitle>

            <Wrapper>
              <Slider {...settings}>
                {values.map((stock) => (
                  <SCard
                    index={stock[0]}
                    stockInfo={stock}
                    handleSelectedStock={handleSelectedStock}
                  />
                ))}
              </Slider>
            </Wrapper>
          </div>
        ))}
      </div>

      {/* <div>
        <NormalTitle>신한투자증권</NormalTitle>
        <Wrapper>
          <Slider {...settings}>
            {stocks.map((stock, index) => (
              <SCard
                index={index}
                stockInfo={stock}
                handleSelectedStock={handleSelectedStock}
              />
            ))}
          </Slider>
        </Wrapper>
      </div> */}
    </div>
  );
}
