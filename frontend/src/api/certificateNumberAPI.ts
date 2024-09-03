import BaseApi from "./axiosInstance";

export interface CertificateData {
  phoneNumber: string | null;
}

export interface ValidateCodeData {
  phoneNumber: string | null;
  code: string;
}

export default class certificatePhoneNumberAPI extends BaseApi {
  async postPhoneNumber(data: CertificateData) {
    const resp = await this.fetcher.post("/users/sms-request", data);
    return resp;
  }

  async postCode(data: ValidateCodeData) {
    const resp = await this.fetcher.post("/users/sms-verification", data);
    return resp;
  }
}
