import BaseApi from "./axiosInstance";

export interface LoginReqData {
  loginId: string | undefined;
  password: string | undefined;
}

export default class loginApi extends BaseApi {
  async postUserLoginInfo(data: LoginReqData) {
    const resp = await this.fetcher.post("/users/login", data);
    return resp;
  }
}
