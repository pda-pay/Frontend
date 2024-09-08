import BaseApi from "./axiosInstance";

export interface getCollateralDataI {
  id: number;
  userId: string;
  mortgageSum: number;
  todayLimit: number;
  marginRequirement: number;
}

export default class adminAPI extends BaseApi {
  async getCollateralData() {
    const resp = await this.fetcher.get(
      "/schedule/user-margin-requirements-under?limit=160"
    );
    return resp;
  }
}
