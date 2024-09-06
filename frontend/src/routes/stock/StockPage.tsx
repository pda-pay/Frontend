import { useEffect, useState } from "react";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import ShowSelectedPage from "./ShowSelectedPage";
import BoldTitle from "../../components/text/BoldTitle";
import QuestionButton from "../../components/button/QuestionButton";
import LevelInfoModal from "./component/LevelInfoModal";
import OwnStockList from "./component/OwnStockList";
import MoveButton from "../../components/button/MoveButton";
import ButtonBar from "../../components/button/ButtonBar";
import payServiceAPI from "../../api/payServiceAPI";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

type ItemObject = {
  accountNumber: string;
  quantity: number;
  mortgagedQuantity: number;
  stockCode: string;
  stockName: string;
  companyCode: string;
  companyName: string;
  stabilityLevel: number;
  stockPrice: number;
  limitPrice: number;
};

export default function StockPage() {
  //const navigate = useNavigate();
  const payjoinservice = new payServiceAPI();

  //보유 주식 목록: length = 10
  //ownStock은 변하는 일이 없어야 함.
  //0: 계좌번호, 1: 보유주수, 2: 담보주수, 3: 종목코드, 4: 종목명, 5: 증권사코드,  6: 증권사명, 7: 등급, 8: 전일종가, 9: 한도
  const [ownStock, setOwnStock] = useState<
    [
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
    ][]
  >([]);

  //선택한 주식 목록: length = 10
  //0: 계좌번호, 1: 보유주수, 2: 담보주수, 3: 종목코드, 4: 종목명, 5: 증권사코드,  6: 증권사명, 7: 등급, 8: 전일종가, 9: 한도
  const [selectedStock, setSelectedStock] = useState<
    [
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
    ][]
  >([]);

  //한도
  const [limit, setLimit] = useState<number>(0);
  //모달창 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //0이면 증권조회 컴포넌트 출력, 1이면 선택한 주식 컴포넌트 출력
  const [page, setPage] = useState<number>(0);

  //api 호출 후 보유 주식 저장
  const getStocks = async () => {
    try {
      const response = await payjoinservice.getAllStock();

      if (response.status === 200) {
        const data = response.data.stockMortgagedStocks;
        saveOwnStock(data);
        //setOwnStock([...data]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 || error.response?.status === 403)
          console.log("에러 발생 " + error);
      }
    }
  };

  //담보 잡은 주식 보내기
  const putMorgagedStocks = async (): Promise<boolean> => {
    try {
      const response = await payjoinservice.putMortgagedStock(
        makeMortgagedReqData()
      );
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.log("담보 put 요청 에러 발생: " + error);
        }
      }
      return false;
    }
  };

  const saveOwnStock = (data: ItemObject[]) => {
    const temp: [
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
    ][] = data.map((item) => [
      item.accountNumber,
      item.quantity,
      item.mortgagedQuantity,
      item.stockCode,
      item.stockName,
      item.companyCode,
      item.companyName,
      item.stabilityLevel,
      item.stockPrice,
      item.limitPrice,
    ]);
    setOwnStock([...temp]);
  };

  useEffect(() => {
    getStocks();
  }, []);

  //선택한 주식 초기화
  useEffect(() => {
    console.log(ownStock);
    setSelectedStock([...ownStock]);
  }, [ownStock]);

  // useEffect(() => {
  //   const temp: [
  //     string,
  //     string,
  //     string,
  //     string,
  //     number,
  //     number,
  //     number,
  //     number,
  //     string
  //   ][] = ownStock.map((row) => {
  //     const newRow: [
  //       string,
  //       string,
  //       string,
  //       string,
  //       number,
  //       number,
  //       number,
  //       number,
  //       string
  //     ] = [row[0], row[1], row[2], row[3], row[4], 0, row[5], row[6], row[7]];
  //     return newRow;
  //   });
  //   setSelectedStock(temp);
  // }, [ownStock]);

  //증권별로 구분 후, 보유주식에서 몇번째였는지 0번째에 저장
  const [category, setCategory] = useState<{
    [key: string]: [
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
  }>({});

  const handleCategory = (
    arr: [
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
    ][]
  ) => {
    const grouped: {
      [key: string]: [
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
    } = {};

    arr.forEach((stock, index) => {
      //증권사명을 키값으로 저장
      const key = stock[6];
      const newStock: [
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

  //담보 주식 정보를 가져와서 그룹으로 묶기
  useEffect(() => {
    setCategory(handleCategory(selectedStock));
  }, [selectedStock]);

  const handleSelectedStock = (index: number, amount: number) => {
    // 상태를 업데이트할 때 최신 상태를 참조하여 업데이트
    setSelectedStock((prevSelectedStock) => {
      // 현재 상태의 origin을 기반으로 새로운 행 생성
      const newRow: [
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
      ] = [
        prevSelectedStock[index][0],
        prevSelectedStock[index][1],
        amount,
        prevSelectedStock[index][3],
        prevSelectedStock[index][4],
        prevSelectedStock[index][5],
        prevSelectedStock[index][6],
        prevSelectedStock[index][7],
        prevSelectedStock[index][8],
        prevSelectedStock[index][9],
      ];

      // 새로운 상태 배열 생성
      const temp: [
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
      totalLimit += selectedStock[i][2] * selectedStock[i][9];
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
  //const location = useLocation();

  // useEffect(() => {
  //   if (location.state) {
  //     const { priorityToStock } = location.state as {
  //       priorityToStock: [
  //         string,
  //         string,
  //         string,
  //         string,
  //         number,
  //         number,
  //         number,
  //         number,
  //         string
  //       ][];
  //     };
  //     setSelectedStock(priorityToStock);
  //   }
  // }, [location.state]);

  const makeMortgagedReqData = () => {
    return {
      mortgagedStocks: selectedStock
        .filter(
          (
            stock: [
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
            ]
          ) => stock[2] !== 0
        ) // stock[2] 값이 0이 아닌 항목만 필터링
        .map(
          (
            stock: [
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
            ]
          ) => ({
            //0: 계좌번호, 1: 보유주수, 2: 담보주수, 3: 종목코드, 4: 종목명, 5: 증권사코드,  6: 증권사명, 7: 등급, 8: 전일종가, 9: 한도
            accountNumber: stock[0],
            quantity: stock[2],
            stockCode: stock[3],
            stockName: stock[4],
            companyCode: stock[5],
            companyName: stock[6],
            stabilityLevel: stock[7],
            limitPrice: stock[9],
          })
        ),
    };
  };

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

          <div className="mt-auto">
            <div className="mb-5">
              <div className="flex justify-between mb-5">
                <BoldTitle>
                  현재 확보한 최대 한도: <br />
                  {limit.toLocaleString()} 원
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
              nextOnClick={putMorgagedStocks}
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
