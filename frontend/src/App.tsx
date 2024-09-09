import { RouterProvider } from "react-router-dom";
import MainRouter from "./main-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // 강제로 라이트 모드로 설정
    document.documentElement.style.setProperty("color-scheme", "light");
  }, []);

  return <RouterProvider router={MainRouter}></RouterProvider>;
}

export default App;