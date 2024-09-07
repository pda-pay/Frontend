import BaseApi from "./axiosInstance";

// export interface HistoryReqData {
//   userId: string;
// }

export default class paymentAPI extends BaseApi {
  async getPaymentInfo(/*data: HistoryReqData*/) {
    const resp = await this.fetcher.get("/payment/cash-info");
    return resp;
  }

  async getPaymentHistory(value: number) {
    const resp = await this.fetcher.get(`/payment/history?month=${value}`);
    return resp;
  }
}
