import BaseApi from "./axiosInstance";

export default class repaymentAPI extends BaseApi {
  async getRepaymentHistory(y: number, m: number) {
    const resp = await this.fetcher.get(
      `/repayment/history?year=${y}&month=${m}`
    );
    return resp;
  }
}
