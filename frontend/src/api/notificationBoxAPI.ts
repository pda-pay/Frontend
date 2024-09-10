import BaseApi from "./axiosInstance";

export default class notificationBoxAPI extends BaseApi {
  async getNotifications() {
    const resp = await this.fetcher.get("/notification");
    return resp;
  }

  async deleteNotifications(ids: number[]) {
    await this.fetcher.delete("/notification", {
      data: { ids },
    });
  }
}
