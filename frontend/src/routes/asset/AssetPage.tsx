import { useState, useEffect } from "react";
import axios from "axios";
import userAPI from "../../api/userAPI";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";

export default function AssetPage() {
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
      {memeber ? (
        <div>{name}님, 자산 페이지임.</div>
      ) : (
        <div>자산 페이지임.</div>
      )}
    </PaddingDiv>
  );
}
