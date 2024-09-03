import BaseApi from "./axiosInstance";

export interface JoinReqData {
  loginId: string;
  password: string;
  name: string;
  phoneNumber: string;
}

export interface IdReqData {
  loginId: string | undefined;
}

export default class joinApi extends BaseApi {
  async postUserInfo(data: JoinReqData) {
    const resp = await this.fetcher.post("/users/signup", data);
    return resp;
  }

  async postUserId(data: IdReqData) {
    const resp = await this.fetcher.post("/users/validation", data);
    return resp;
  }
}
