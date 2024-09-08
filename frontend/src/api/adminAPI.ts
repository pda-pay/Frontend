import BaseApi from "./axiosInstance";

export default class adminAPI extends BaseApi {
  async getCollateralData() {
    const resp = await this.fetcher.get("/실제주소로 변경예정");
    return resp;
  }
}
