import { useNavigate } from "react-router-dom";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import LargeButton from "../../components/button/LargeButton";
import userAPI from "../../api/userAPI";
import { useEffect } from "react";

export default function ApproachPage() {
  const userservice = new userAPI();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await userservice.checkMem();

      if (response.status === 200) {
        navigate("/main");
      }
    } catch (error) {
      navigate("/");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <PaddingDiv>
      <div className="flex flex-col mt-auto mb-auto gap-10">
        <div className="flex justify-center w-full mb-12">
          <img src="/public/images/140PAY.jpg" alt="Logo" />
        </div>
        <div className="flex flex-col gap-7">
          <LargeButton type="blue" onClick={() => navigate("/login")}>
            로그인하기
          </LargeButton>
          <div
            className="ml-auto mr-auto text-gray-500"
            onClick={() => navigate("/mydata")}
          >
            <u>회원가입하기</u>
          </div>
        </div>
      </div>
    </PaddingDiv>
  );
}
