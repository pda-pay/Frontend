import { useState, useEffect } from "react";
import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import ConfirmModal from "./component/ConfirmModal";
import ButtonBar from "../../components/button/ButtonBar";
import NormalTitle from "../../components/text/NormalTitle";

export default function ConfirmPage() {
  //TODO: useLocation으로 가져온 userInfo
  //const userInfo: [number, string] = [아이디, 이름];

  //TODO: api GET 요청으로 받아온 계좌정보
  const account: string[] = ["신한은행", "1111-1111-1111"];
  //TODO: api GET 요청으로 받아온 결제일 정보
  const payDate: number = 7;
  //TODO: api GET 요청으로 받아온 설정 한도
  const limit: number = 50000000;
  //TODO: 담보로 잡은 주식
  const stocks: [
    string, // "accountNumber": "456-7890-12345",
    number, //         "quantity": 250,
    number, //         "mortgagedQuantity": 0,
    string, //         "stockCode": "005930",
    string, //         "stockName": "삼성전자",
    string, //         "companyCode": "04",
    string, //         "companyName": "삼성증권",
    number, //         "stabilityLevel": 1,
    number, //         "stockPrice": 74300,
    number //         "limitPrice": 48295.0
  ][] = [
    [
      "1212-1212-1212",
      50,
      30,
      "0590",
      "삼성전자",
      "0202",
      "NH투자증권",
      1,
      70000,
      55000,
    ],
    [
      "2323-2323-2323",
      80,
      50,
      "0120",
      "하이닉스",
      "0101",
      "신한투자증권",
      1,
      50000,
      35000,
    ],
    [
      "2323-2323-2323",
      50,
      30,
      "0590",
      "삼성전자",
      "0101",
      "신한투자증권",
      1,
      70000,
      55000,
    ],
    [
      "3434-3434-3434",
      20,
      20,
      "0590",
      "삼성전자",
      "0101",
      "신한투자증권",
      1,
      70000,
      55000,
    ],
  ];
  //TODO: api GET 요청으로 받아온 우선순위 적용된 배열
  //[우선순위, 계좌번호, 담보주수, 종목코드, 종목명, 증권사코드, 증권사명, 위험도, 전일종가, 한도]
  const [priStocks, setPriStocks] = useState<
    [
      number,
      string,
      number,
      string,
      string,
      string,
      string,
      number,
      number,
      number
    ][]
  >([
    [
      4,
      "3434-3434-3434",
      20,
      "0590",
      "삼성전자",
      "0101",
      "신한투자증권",
      1,
      70000,
      55000,
    ],
    [
      3,
      "2323-2323-2323",
      50,
      "0120",
      "하이닉스",
      "0101",
      "신한투자증권",
      1,
      50000,
      35000,
    ],
    [
      1,
      "1212-1212-1212",
      20,
      "0590",
      "삼성전자",
      "0202",
      "NH투자증권",
      1,
      70000,
      55000,
    ],
    [
      5,
      "2323-2323-2323",
      30,
      "0590",
      "삼성전자",
      "0101",
      "신한투자증권",
      1,
      70000,
      55000,
    ],
    [
      2,
      "1212-1212-1212",
      10,
      "0590",
      "삼성전자",
      "0202",
      "NH투자증권",
      1,
      70000,
      55000,
    ],
  ]);

  const threeStocks = stocks.slice(0, 3);

  useEffect(() => {
    // 배열을 첫 번째 열 기준으로 오름차순 정렬
    const sortedArr = [...priStocks].sort((a, b) => a[0] - b[0]);
    setPriStocks([...sortedArr]);
  }, []);

  // 상위 5개의 값을 저장할 state
  const fivePriStocks = priStocks.slice(0, 5);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //0이면 담보 모달, 1이면 우선 순위 모달
  const [modalNum, setModalNum] = useState<number>();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMortgageModal = () => {
    setModalNum(0);
    openModal();
  };

  const handlePriorityModal = () => {
    setModalNum(1);
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <PaddingDiv>
      <NormalTitle>
        <span className="font-bold">고객님,</span> 결제 서비스 설정을
        확인해주세요.
      </NormalTitle>
      <div>
        <BackgroundFrame color="blue">
          <div className="flex flex-col gap-1 my-3">
            <div className="flex flex-col gap-2">
              <div>
                결제 계좌: {account[0]} {account[1]}
              </div>
              <div>결제일: 매월 {payDate}일</div>
            </div>
          </div>
        </BackgroundFrame>
      </div>
      <div className="flex flex-col gap-5">
        <BackgroundFrame color="blue">
          <div className="flex flex-col gap-3 my-3">
            <BoldTitle>설정한 한도: {limit}원</BoldTitle>
            <div>
              <div className="flex justify-between mb-3">
                <BoldTitle>선택한 종목</BoldTitle>
                <span className="text-gray-400" onClick={handleMortgageModal}>
                  자세히 보기
                </span>
              </div>

              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                {threeStocks.map((stock) => (
                  <li>
                    [{stock[6]}] {stock[4]} {stock[2]}주
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </BackgroundFrame>
        <BackgroundFrame color="blue">
          <div className="flex flex-col gap-3 my-3">
            <div className="flex justify-between">
              <BoldTitle>매도 우선순위</BoldTitle>
              <span className="text-gray-400" onClick={handlePriorityModal}>
                자세히 보기
              </span>
            </div>

            <ul
              style={
                {
                  /*paddingLeft: "20px" */
                }
              }
            >
              {fivePriStocks.map((stock) => (
                <li>
                  {stock[0]}. [{stock[6]}] {stock[4]} {stock[2]}주
                </li>
              ))}
            </ul>
          </div>
        </BackgroundFrame>
      </div>

      {isModalOpen &&
        (modalNum === 0 ? (
          <ConfirmModal
            mortgage={stocks}
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <ConfirmModal
            priority={priStocks}
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
          />
        ))}
      <ButtonBar
        beforetext="이전"
        nexttext="다음"
        beforeurl="/paymentdate"
        nexturl="/simple"
      ></ButtonBar>
    </PaddingDiv>
  );
}
