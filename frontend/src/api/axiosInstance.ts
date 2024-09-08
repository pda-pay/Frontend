import axios from "axios";
import { Cookies } from "react-cookie";

export default class BaseApi {
  fetcher;
  cookies: Cookies;

  constructor() {
    this.cookies = new Cookies();
    axios.defaults.withCredentials = true;
    this.fetcher = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 헤더에 액세스 토큰 추가하는 인터셉터
    this.fetcher.interceptors.request.use(
      (config) => {
        const accessToken = this.cookies.get("accessToken");

        if (accessToken) {
          config.headers.Authorization = `${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
