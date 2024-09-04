import axios from "axios";
import { Cookies } from "react-cookie";

export default class BaseApi {
  cookies = new Cookies();
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

    // 헤더에 액세스 토큰 추가하는 인터셉터
    this.fetcher.interceptors.request.use(
      (config) => {
        // 쿠키에서 accessToken 가져오기
        const accessToken = this.cookies.get("accessToken");

        // accessToken이 존재할 경우 헤더에 추가
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
