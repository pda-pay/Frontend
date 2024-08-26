import AllMenuButton from "../button/AllMenuButton";
import AssetButton from "../button/AssetButton";
import CardButton from "../button/CardButton";
import HomeButton from "../button/HomeButton";

export default function Menubar() {
  return (
    <div className="flex justify-around">
      <HomeButton />
      <CardButton />
      <AssetButton />
      <AllMenuButton />
    </div>
  );
}
