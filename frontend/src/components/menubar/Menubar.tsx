import AllMenuButton from "../button/AllMenuButton";
import AssetButton from "../button/AssetButton";
import CardButton from "../button/CardButton";
import HomeButton from "../button/HomeButton";

interface InfoProps {
  userInfo: [string, string, boolean];
}

export default function Menubar({ userInfo }: InfoProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white">
      <div className="w-screen flex justify-around py-3">
        <HomeButton userInfo={userInfo} />
        <CardButton userInfo={userInfo} />
        <AssetButton userInfo={userInfo} />
        <AllMenuButton userInfo={userInfo} />
      </div>
    </div>
  );
}
