import BaseApi from "./axiosInstance";

export interface JoinReqData {
  loginId: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export default class joinApi extends BaseApi {
  async postUserInfo(data: JoinReqData) {
    const resp = await this.fetcher.post("/users/signup", data);
    return resp;
  }
}
