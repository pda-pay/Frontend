import BaseApi from "./axiosInstance";

export interface getHistoryI {
  createdAt: string;
  maxLimit: number;
  mortgageSum: number;
  todayLimit: number;
  userId: number;
}

export default class assetAPI extends BaseApi {
  async getHistory() {
    const resp = await this.fetcher.get("/asset/history/last-10-days");
    return resp;
  }
}
