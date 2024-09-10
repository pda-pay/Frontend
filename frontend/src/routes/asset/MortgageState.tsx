import { useEffect, useState } from "react";
import BoldTitle from "../../components/text/BoldTitle";
import PercentageBar from "./PercentageBar";
import StockSeperator from "./StockSeperator";
import payServiceAPI from "../../api/payServiceAPI";

export interface StockInfo {
  companyName: string;
  name: string;
  amount: number;
  mortgaged: boolean;
  stabilityLevel: number;
  limitPrice: number;
  stockPrice: number;
}

export interface MyStockData {
  free: StockInfo[];
  mortgaged: StockInfo[];
}

export default function MortgageState() {
  const [freeAmount, setFreeAmount] = useState<number>(0);
  const [mortgagedAmount, setMortgagedAmount] = useState<number>(0);
  const [MyStockData, setMyStockData] = useState<MyStockData>({
    free: [],
    mortgaged: [],
  });
  const service = new payServiceAPI();

  const fetchData = async () => {
    const result = (await service.getAllStock()).data;

    console.log(result);

    const data: MyStockData = {
      free: [],
      mortgaged: [],
    };

    let f = 0;
    let m = 0;

    result.stockMortgagedStocks.forEach((value) => {
      if (value.mortgagedQuantity > 0) {
        m += value.mortgagedQuantity * value.stockPrice;
        data.mortgaged.push({
          companyName: value.companyName,
          name: value.stockName,
          amount: value.mortgagedQuantity,
          mortgaged: true,
          stabilityLevel: value.stabilityLevel,
          limitPrice: value.limitPrice,
          stockPrice: value.stockPrice,
        });
      }

      f += (value.quantity - value.mortgagedQuantity) * value.stockPrice;
      data.free.push({
        companyName: value.companyName,
        name: value.stockName,
        amount: value.quantity - value.mortgagedQuantity,
        mortgaged: false,
        stabilityLevel: value.stabilityLevel,
        limitPrice: value.limitPrice,
        stockPrice: value.stockPrice,
      });
    });

    console.log(m);
    console.log(f);

    setFreeAmount(f);
    setMortgagedAmount(m);
    setMyStockData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center my-5">
      <p className="text-xl font-bold">담보 주식을 확인해보세요</p>
      <PercentageBar free={freeAmount} mortgaged={mortgagedAmount} />
      <StockSeperator
        free={MyStockData.free}
        mortgaged={MyStockData.mortgaged}
      />
    </div>
  );
}
