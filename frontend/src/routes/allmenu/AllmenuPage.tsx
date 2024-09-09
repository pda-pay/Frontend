import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import userAPI from "../../api/userAPI";
import PaddingDiv from "../../components/settingdiv/PaddingDiv";
import BoldTitle from "../../components/text/BoldTitle";
import NormalTitle from "../../components/text/NormalTitle";
import loginApi from "../../api/loginAPI";
import { useNavigate } from "react-router-dom";
import CashMortgagedModal from "../repay/component/CashMortgagedModal";
import { FaBell } from "react-icons/fa6";

const StyledFaBell = styled(FaBell)`
  font-size: 27px;
  margin-left: auto;
  cursor: pointer;
  &:hover {
    color: #1342ba;
  }
`;

export default function AllmenuPage() {
  const navigate = useNavigate();
  const logservice = new loginApi();
  const userservice = new userAPI();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [name, setName] = useState<string>("익명");
  const [member, setMember] = useState<boolean>(false);

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
          boxShadow: "0 5px 5px -5px rgba(0,0,0,0.12)",
        }}
      >
        <div className="py-10 px-5 flex items-center ">
          <NormalTitle>
            <span className="font-bold">{name}님,</span> 안녕하세요.
          </NormalTitle>
          <StyledFaBell onClick={() => navigate("/notificationBox")} />
          <button
            className="text-xs ml-[13px]"
            style={{ backgroundColor: "#9abade33", borderRadius: "20px" }}
            onClick={logOut}
          >
            로그아웃
          </button>
        </div>
      </div>
      <div>
        <NormalTitle>
          <span className="text-gray-400 cursor-default">결제 서비스</span>
        </NormalTitle>
        <div className="ml-3 mt-3 flex flex-col gap-2">
          {!member && (
            <div onClick={() => navigate("/serviceagree")}>
              <BoldTitle>결제 서비스 가입 하기</BoldTitle>
            </div>
          )}
          {/*TODO: QR 결제하기로 연결*/}
          <div
            onClick={() => {
              if (member) navigate("/");
            }}
          >
            <BoldTitle>
              <span className="cursor-pointer">QR 결제하기</span>
            </BoldTitle>
          </div>
          <div
            onClick={() => {
              if (member) navigate("/paymenthistory");
            }}
          >
            <BoldTitle>
              <span className="cursor-pointer">결제 내역 보기</span>
            </BoldTitle>
          </div>
        </div>
      </div>

      <div>
        <NormalTitle>
          <span className="text-gray-400 cursor-default">한도 및 상환</span>
        </NormalTitle>

        <div className="ml-3 mt-3 flex flex-col gap-2">
          <div
            onClick={() => {
              if (member) openModal();
            }}
          >
            <BoldTitle>
              <span className="cursor-pointer">선결제하기</span>
            </BoldTitle>
          </div>
          <div
            onClick={() => {
              if (member) navigate("/account");
            }}
          >
            <BoldTitle>
              <span className="cursor-pointer">결제 계좌 변경</span>
            </BoldTitle>
          </div>
          <div
            onClick={() => {
              if (member) navigate("/limit", { state: { menu: true } });
            }}
          >
            <BoldTitle>
              <span className="cursor-pointer">한도 변경</span>
            </BoldTitle>
          </div>
          <div
            onClick={() => {
              if (member) navigate("/stock");
            }}
          >
            <BoldTitle>
              <span className="cursor-pointer">담보 변경</span>
            </BoldTitle>
          </div>
          <div
            onClick={() => {
              if (member) navigate("/priority", { state: { menu: true } });
            }}
          >
            <BoldTitle>
              <span className="cursor-pointer">우선순위 확인 및 변경</span>
            </BoldTitle>
          </div>
        </div>
      </div>

      <div>
        <NormalTitle>
          <span className="text-gray-400 cursor-default">자산 현황</span>
        </NormalTitle>
        <div className="ml-3 mt-3 flex flex-col gap-2">
          <div
            onClick={() => {
              if (member) navigate("/asset");
            }}
          >
            <BoldTitle>
              <span className="cursor-pointer">자산 확인하기</span>
            </BoldTitle>
          </div>
          <div
            onClick={() => {
              if (member) navigate("/asset");
            }}
          >
            <BoldTitle>
              <span className="cursor-pointer">잔고 확인하기</span>
            </BoldTitle>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CashMortgagedModal
          isModalOpen={isModalOpen}
          handleCloseModal={closeModal}
        />
      )}
    </PaddingDiv>
  );
}
