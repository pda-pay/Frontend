import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import QuestionButton from "../../components/button/QuestionButton";
import LoginButtonbar from "./component/LoginButtonbar";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen p-5 flex flex-col justify-between">
      <div>
        this is loginpage! hi~ <QuestionButton />
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
