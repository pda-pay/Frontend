import BaseApi from "./axiosInstance";

export interface PutMortgagedReqData {
  mortgagedStocks: {
    accountNumber: string;
    quantity: number;
    stockCode: string;
    stockName: string;
    companyCode: string;
    companyName: string;
    stabilityLevel: number;
    limitPrice: number;
  }[];
}

export default class payServiceAPI extends BaseApi {
  //보유 주식 가져오기
  async getAllStock() {
    const resp = await this.fetcher.get("/payment/users/stocks");
    return resp;
  }

  //담보 주식 보내기
  async putMortgagedStock(data: PutMortgagedReqData) {
    const resp = await this.fetcher.put(
      "/payment/users/mortgaged-stocks",
      data
    );
    return resp;
  }

  //우선순위와 담보주식 가져오기
  async getPriorityStock() {
    const resp = await this.fetcher.get("/payment/users/stock-priorities");
    return resp;
  }
}
