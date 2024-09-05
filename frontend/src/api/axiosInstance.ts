import axios from "axios";

export default class BaseApi {
  fetcher;
  constructor() {
    axios.defaults.withCredentials = true;
    this.fetcher = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // token 관련 interceptors 필요 시 코드 추가하면 될듯
  }
}
