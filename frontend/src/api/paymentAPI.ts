import BaseApi from "./axiosInstance";

// export interface HistoryReqData {
//   userId: string;
// }

export default class paymentAPI extends BaseApi {
  async getPaymentInfo(/*data: HistoryReqData*/) {
    const resp = await this.fetcher.post("/payment/info");
    return resp;
  }
}
