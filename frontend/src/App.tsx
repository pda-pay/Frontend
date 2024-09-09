import { RouterProvider } from "react-router-dom";
import MainRouter from "./main-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return <RouterProvider router={MainRouter}></RouterProvider>;
}

export default App;
