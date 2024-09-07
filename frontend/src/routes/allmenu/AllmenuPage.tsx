import { useState, useEffect } from "react";
import axios from "axios";
import userAPI from "../../api/userAPI";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import NormalTitle from "../../components/text/NormalTitle";
import loginApi from "../../api/loginAPI";
import { useNavigate } from "react-router-dom";

export default function AllmenuPage() {
  const navigate = useNavigate();
  const logservice = new loginApi();
  const userservice = new userAPI();

  const [name, setName] = useState<string>("익명");
  const [memeber, setMember] = useState<boolean>(false);

  const logOut = async () => {
    try {
      const response = await logservice.logOut();

      if (response.status === 200) {
        console.log("로그아웃 성공");
        navigate("/");
      }
    } catch (error) {
      console.log("로그아웃 실패: " + error);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await userservice.checkMem();

      if (response.status === 200) {
        setName(response.data.userId);
        setMember(response.data.paymentServiceMember);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("에러 발생: " + error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <PaddingDiv>
      <div
        style={{
          backgroundColor: "#9abade33",
          marginLeft: "-20px",
          marginRight: "-20px",
          marginTop: "-27px",
        }}
      >
        <div className="p-10 flex">
          <NormalTitle>
            <span className="font-bold">{name}님,</span> 안녕하세요.
          </NormalTitle>
          <button
            className="text-xs ml-auto"
            style={{ backgroundColor: "#9abade33", borderRadius: "20px" }}
            onClick={logOut}
          >
            로그아웃
          </button>
        </div>
      </div>
    </PaddingDiv>
  );
}
