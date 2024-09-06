import BaseApi from "./axiosInstance";

export default class userAPI extends BaseApi {
  //가입 여부
  async checkMem() {
    const resp = await this.fetcher.get("/payment/users/join");
    return resp;
  }
}
