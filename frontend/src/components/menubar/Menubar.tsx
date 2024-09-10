import { useLocation } from "react-router-dom";
import AllMenuButton from "../button/AllMenuButton";
import AssetButton from "../button/AssetButton";
import CardButton from "../button/CardButton";
import HomeButton from "../button/HomeButton";

export default function Menubar() {
  const location = useLocation(); // 현재 경로를 가져옴

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white"
      style={{ boxShadow: "0 0 5px -0 rgba(0,0,0,0.12)" }}
    >
      <div className="w-screen flex justify-around py-3">
        <HomeButton active={location.pathname === "/main"} />
        <CardButton active={location.pathname === "/payment"} />
        <AssetButton active={location.pathname === "/asset"} />
        <AllMenuButton active={location.pathname === "/allmenu"} />
      </div>
    </div>
  );
}
