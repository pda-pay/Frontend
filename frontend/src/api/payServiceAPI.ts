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

export interface PutPriorityReqData {
  stockPriorities: {
    accountNumber: string;
    quantity: number;
    stockCode: string;
    stockName: string;
    stockRank: number;
    companyCode: string;
    companyName: string;
    stabilityLevel: number;
    stockPrice: number;
    limitPrice: number;
  }[];
}

export interface PutAccountReqData {
  repaymentAccount: {
    accountNumber: string;
    companyCode: string;
    companyName: string;
    category: string;
  };
}

export interface PutPaymentDateReqData {
  repaymentDate: number;
}

export interface PostSimplePasswordReqData {
  paymentPassword: string | undefined;
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

  //우선순위 보내기
  async putPriorityStock(data: PutPriorityReqData) {
    const resp = await this.fetcher.put(
      "/payment/users/stock-priorities",
      data
    );
    return resp;
  }

  //한도 가져오기
  async getLimit() {
    const resp = await this.fetcher.get("/payment/users/limit-information");
    return resp;
  }

  //한도 보내기

  //은행 계좌 가져오기
  async getAccount() {
    const resp = await this.fetcher.get("/payment/users/accounts");
    return resp;
  }

  //은행 계좌 보내기
  async putAccount(data: PutAccountReqData) {
    const resp = await this.fetcher.put("/payment/users/accounts", data);
    return resp;
  }

  //상환일 보내기
  async putPaymentDate(data: PutPaymentDateReqData) {
    const resp = await this.fetcher.put("/payment/users/repayment-date", data);
    return resp;
  }

  //최종 컨펌 정보 가져오기
  async getFinalInfo() {
    const resp = await this.fetcher.get("/payment/users/information");
    return resp;
  }

  //간편비번 보내기
  async postSimplePassword(data: PostSimplePasswordReqData) {
    const resp = await this.fetcher.post("/payment/users/join", data);
    return resp;
  }
}
