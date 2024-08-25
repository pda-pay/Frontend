import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import LoginButtonbar from "./component/LoginButtonbar";

export default function JoinPage() {
  return (
    <div className="w-screen h-screen p-5 flex flex-col justify-between">
      <div>
        this is loginpage! hi~
        <BackgroundFrame color="blue">
          this!
          <br />
          !!!
          <br />
        </BackgroundFrame>
      </div>
      <LoginButtonbar />
    </div>
  );
}
