import AllMenuButton from "../button/AllMenuButton";
import AssetButton from "../button/AssetButton";
import CardButton from "../button/CardButton";
import HomeButton from "../button/HomeButton";

export default function Menubar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white"
      style={{ boxShadow: "0 0 5px -0 rgba(0,0,0,0.12)" }}
    >
      <div className="w-screen flex justify-around py-3">
        <HomeButton />
        <CardButton />
        <AssetButton />
        <AllMenuButton />
      </div>
    </div>
  );
}
