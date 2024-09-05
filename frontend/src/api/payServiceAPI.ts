import BaseApi from "./axiosInstance";

export default class payServiceAPI extends BaseApi {
  async getAllStock() {
    const resp = await this.fetcher.get("/payment/users/stocks");
    return resp;
  }
}
