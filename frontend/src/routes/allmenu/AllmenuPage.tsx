import { useState, useEffect } from "react";
import axios from "axios";
import userAPI from "../../api/userAPI";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";

export default function AllmenuPage() {
  const userservice = new userAPI();

  const [name, setName] = useState<string>("익명");
  const [memeber, setMember] = useState<boolean>(false);

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
      <div>
        {" "}
        {memeber ? (
          <div>{name}님, 전체메뉴 페이지 입니다.</div>
        ) : (
          <div>전체메뉴 페이지임</div>
        )}
      </div>
    </PaddingDiv>
  );
}
