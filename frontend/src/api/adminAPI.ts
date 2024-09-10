import BaseApi from "./axiosInstance";

export interface getCollateralDataI {
  id: number;
  userId: string;
  mortgageSum: number;
  todayLimit: number;
  marginRequirement: number;
}

export interface getMortgageDeclineI {
  id: number;
  userId: string;
  mortgageSum: number;
  todayLimit: number;
  marginRequirement: number;
  mortgageSumRateOfChange: number;
}

export default class adminAPI extends BaseApi {
  async getCollateralData() {
    const resp = await this.fetcher.get(
      "/asset/margin-requirement/under?limit=170"
    );
    return resp;
  }

  async getMortgageDecline(limit: number) {
    const resp = await this.fetcher.get(
      "/asset/rate-of-change/under?limit=" + limit
    );
    return resp;
  }
}
