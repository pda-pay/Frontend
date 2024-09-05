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
    // token 관련 interceptors 필요 시 코드 추가하면 될듯

    // 헤더에 액세스 토큰 추가하는 인터셉터
    this.fetcher.interceptors.request.use(
      (config) => {
        const accessToken = this.cookies.get("accessToken");

        if (accessToken) {
          config.headers.Authorization = `${accessToken}`;
          console.log("Fetched Access Token:", accessToken); // 디버깅용
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
