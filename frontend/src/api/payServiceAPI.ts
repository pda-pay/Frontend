import BaseApi from "./axiosInstance";

export default class payServiceAPI extends BaseApi {
  //보유 주식 가져오기
  async getAllStock() {
    const resp = await this.fetcher.get("/payment/users/stocks");
    return resp;
  }
}
