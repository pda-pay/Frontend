import { Outlet, ScrollRestoration } from "react-router-dom";
import Buttonbar from "./buttonbar/Buttonbar";

export default function ButtonbarLayout() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
      <Buttonbar />
      <ScrollRestoration />
    </div>
  );
}
