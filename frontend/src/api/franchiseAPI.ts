import BaseApi from "./axiosInstance";

export interface franchiseLoginReqData {
  code: number;
  password: string;
}

export default class franchiseAPI extends BaseApi {
  async login(data: franchiseLoginReqData) {
    const resp = await this.fetcher.post("/franchise/login", data);
    return resp;
  }
}
