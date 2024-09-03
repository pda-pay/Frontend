import BaseApi from "./axiosInstance";

export interface PaymentTokenReqData {
  userId: string;
  paymentPassword: string;
}

export interface TransactionReqData {
  transactionId: string;
  franchiseCode: string;
  paymentAmount: number;
  token: string;
}

export default class transactionAPI extends BaseApi {
  async getToken(data: PaymentTokenReqData) {
    const resp = await this.fetcher.post("/payment/auth", data);
    return resp;
  }

  async requestTransaction(data: TransactionReqData) {
    const resp = await this.fetcher.post("/payment/requset", data);
    return resp;
  }
}
