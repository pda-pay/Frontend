import { createBrowserRouter } from "react-router-dom";
import ApproachPage from "./routes/approach/ApproachPage";

const routers = [
  {
    path: "/",
    element: <ApproachPage />,
    // index: true
  },
];

const router = createBrowserRouter(routers);

export default router;
