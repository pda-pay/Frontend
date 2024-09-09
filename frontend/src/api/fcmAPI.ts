import BaseApi from "./axiosInstance";

export interface FCMReqData {
    token: string;
  }

export default class fcmApi extends BaseApi {
  async postUserInfo(data: FCMReqData) {
    const resp = await this.fetcher.post("/notification/tokens", data);
    return resp;
  }
}
