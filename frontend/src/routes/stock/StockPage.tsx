import { useEffect, useMemo, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import ShowSelectedPage from "./ShowSelectedPage";
import BoldTitle from "../../components/text/BoldTitle";
import QuestionButton from "../../components/button/QuestionButton";
import LevelInfoModal from "./component/LevelInfoModel";
import OwnStockList from "./component/OwnStockList";
import MoveButton from "../../components/button/MoveButton";
import ButtonBar from "../../components/button/ButtonBar";
import { useLocation } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

export default function StockPage() {
  //const navigate = useNavigate();
  //TODO: 보유주 api로 가져오기
  //회사코드, 회사명, 종목명, 등급, 전일종가, 주수, 한도, 계좌번호
  const ownStock: [
    string,
    string,
    string,
    string,
    number,
    number,
    number,
    string
  ][] = useMemo(
    () => [
      ["01", "신한투자증권", "삼성전자", "A", 70000, 50, 55000, "1111-1111"],
      ["01", "신한투자증권", "하이닉스", "A", 50000, 20, 35000, "1111-1111"],
      ["01", "신한투자증권", "하이닉스", "A", 50000, 30, 35000, "2222-2222"],
      ["02", "NH투자증권", "삼성전자", "A", 70000, 30, 55000, "3333-3333"],
    ],
    []
  );

  //모달창 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //0이면 증권조회 컴포넌트 출력, 1이면 선택한 주식 컴포넌트 출력
  const [page, setPage] = useState<number>(0);

  //선택한 주식 목록: length = 9
  //회사코드, 회사명, 종목명, 등급, 전일종가, 선택한 주수, 전체 주수, 한도, 계좌번호
  const [selectedStock, setSelectedStock] = useState<
    [string, string, string, string, number, number, number, number, string][]
  >([]);
  const [limit, setLimit] = useState<number>(0);

  useEffect(() => {
    const temp: [
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number,
      string
    ][] = ownStock.map((row) => {
      const newRow: [
        string,
        string,
        string,
        string,
        number,
        number,
        number,
        number,
        string
      ] = [row[0], row[1], row[2], row[3], row[4], 0, row[5], row[6], row[7]];
      return newRow;
    });
    setSelectedStock(temp);
  }, [ownStock]);

  const [category, setCategory] = useState<{
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
  }>({});

  const handleCategory = (
    arr: [
      string,
      string,
      string,
      string,
      number,
      number,
      number,
      number,
      string
    ][]
  ) => {
    const grouped: {
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
    } = {};

    arr.forEach((stock, index) => {
      const key = stock[1];
      const newStock: [
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
      ] = [index, ...stock];

      //이미 해당 증권사 그룹이 생성돼있다면,
      if (grouped[key]) {
        grouped[key].push(newStock);
      } else {
        grouped[key] = [newStock];
      }
    });

    return grouped;
  };
  useEffect(() => {
    setCategory(handleCategory(selectedStock));
  }, [selectedStock]);

  const handleSelectedStock = (index: number, amount: number) => {
    // 상태를 업데이트할 때 최신 상태를 참조하여 업데이트
    setSelectedStock((prevSelectedStock) => {
      // 현재 상태의 origin을 기반으로 새로운 행 생성
      const newRow: [
        string,
        string,
        string,
        string,
        number,
        number,
        number,
        number,
        string
      ] = [
        prevSelectedStock[index][0],
        prevSelectedStock[index][1],
        prevSelectedStock[index][2],
        prevSelectedStock[index][3],
        prevSelectedStock[index][4],
        amount,
        prevSelectedStock[index][6],
        prevSelectedStock[index][7],
        prevSelectedStock[index][8],
      ];

      // 새로운 상태 배열 생성
      const temp: [
        string,
        string,
        string,
        string,
        number,
        number,
        number,
        number,
        string
      ][] = [
        ...prevSelectedStock.slice(0, index),
        newRow,
        ...prevSelectedStock.slice(index + 1),
      ];

      // 업데이트된 상태를 반환
      return temp;
    });
  };

  useEffect(() => {
    console.log("바뀜!");
    console.log(selectedStock);
  }, [selectedStock]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const calculateLimit = () => {
    let totalLimit = 0;
    for (let i = 0; i < selectedStock.length; i++) {
      totalLimit += selectedStock[i][5] * selectedStock[i][7];
    }
    return totalLimit;
  };

  const handlePage = (p: number) => {
    setPage(p);
  };

  //TODO: 자동으로 주식 선택
  // const autoSelect = () => {
  //   //한도에 맞춰 주식 선택
  //   //모달창에 입력받고, 선택한 주식 보여주는 페이지로
  //   handlePage(1);
  // };

  useEffect(() => {
    setLimit(calculateLimit);
  }, [selectedStock]);

  //다음 페이지에서 주식을 다시 받아옴
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { priorityToStock } = location.state as {
        priorityToStock: [
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
      setSelectedStock(priorityToStock);
    }
  }, [location.state]);

  return (
    <div>
      {page == 0 ? (
        <PaddingDiv>
          <div className="flex justify-between">
            <BoldTitle>담보로 잡을 주식을 선택해주세요.</BoldTitle>
            <div>
              <div onClick={openModal}>
                <QuestionButton />
              </div>
              {isModalOpen && (
                <LevelInfoModal
                  isModalOpen={isModalOpen}
                  handleCloseModal={closeModal}
                />
              )}
            </div>
          </div>

          <OwnStockList
            stocks={category}
            handleSelectedStock={handleSelectedStock}
          />

          <div>
            <div className="mb-5">
              <div className="flex justify-between mb-5">
                <BoldTitle>
                  현재 확보한 최대 한도: <br />
                  {limit} 원
                </BoldTitle>

                <MoveButton onClick={() => handlePage(1)}>
                  선택한 주식 보기
                </MoveButton>
              </div>
              {/*TODO: 이거 클릭 시에 한도 모달 띄우고 선택한 주식 페이지로*/}
              {/* <div onClick={autoSelect} className="text-sm	text-blue-700">
                원하는 한도에 맞게 주식을 자동으로 선택해주세요.
              </div> */}
            </div>
            <ButtonBar
              beforetext="이전"
              nexttext="다음"
              beforeurl="/serviceagree"
              nexturl="/priority"
              nextstate={{ selectedStock: selectedStock }}
            ></ButtonBar>
          </div>
        </PaddingDiv>
      ) : (
        <ShowSelectedPage
          selectedStock={selectedStock}
          handleSelectedStock={handleSelectedStock}
          handlePage={handlePage}
        ></ShowSelectedPage>
      )}
    </div>
  );
}
