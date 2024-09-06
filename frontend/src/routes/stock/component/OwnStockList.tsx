import Slider from "react-slick";
import styled from "styled-components";
import NormalTitle from "../../../components/text/NormalTitle";
import SCard from "./SCard";

interface StockProps {
  stocks: {
    [
      key: string
    ]: //0: 계좌번호, 1: 보유주수, 2: 담보주수, 3: 종목코드, 4: 종목명, 5: 증권사코드,  6: 증권사명, 7: 등급, 8: 전일종가, 9: 한도
    [
      number,
      string,
      number,
      number,
      string,
      string,
      string,
      string,
      number,
      number,
      number
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
    dots: false,
    arrows: false,
    draggable: true, // 드래그 가능 설정
    swipe: true, // 터치 제스처 스와이프 설정
    touchThreshold: 10, // 터치 감도 조정
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-10">
        {Object.entries(stocks).map(([key, values]) => (
          <div className="flex flex-col gap-5">
            <NormalTitle>{key}</NormalTitle>
            <div>
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
