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
import fcmAPI from "../../api/fcmAPI";
import notificationBoxAPI from "../../api/notificationBoxAPI";
import Swal from "sweetalert2";

interface Message {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  category: string;
}

const StyledFaBell = styled(FaBell)`
  font-size: 27px;
  margin-left: auto;
  cursor: pointer;
  &:hover {
    color: #1342ba;
  }
`;
const NotificationDot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
  transform: translate(50%, -50%);
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
  const [payValid, setPayValid] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const fcmApi = new fcmAPI();

  const notificationService = new notificationBoxAPI();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationService.getNotifications();
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = async () => {
    try {
      const response = await logservice.logOut();

      if (response.status === 200) {
        console.log("로그아웃 성공");
        fcmApi.putUserInfo();
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
        setName(response.data.name);
        setMember(response.data.paymentServiceMember);
        setPayValid(response.data.paymentAccess);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("에러 발생: " + error);
      }
    }
  };

  const handlePayment = () => {
    if (payValid) navigate("/payment-pw-verify");
    else {
      Swal.fire({
        icon: "warning",
        title: `<span style="font-size: 20px; font-weight : bolder;">현재 결제 서비스를 이용할 수<br/> 없습니다.</span>`,
        confirmButtonColor: "blue",
      });
    }
  };

  const notifyToNonmember = () => {
    Swal.fire({
      icon: "warning",
      title: `<span style="font-size: 20px; font-weight : bolder;">결제 서비스 가입 후 이용 가능합니다.</span>`,
      confirmButtonColor: "blue",
    }).then(() => {
      navigate("/serviceagree");
    });
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="py-10 px-5 flex items-center justify-between">
          <NormalTitle>
            <span className="font-bold">{name}님,</span> 안녕하세요.
          </NormalTitle>
          <div className="flex">
            <div style={{ position: "relative" }}>
              <StyledFaBell onClick={() => navigate("/notificationBox")} />
              {messages.length > 0 && <NotificationDot />}
            </div>
            <button
              className="text-xs ml-[13px] focus:outline-none"
              style={{ backgroundColor: "#9abade33", borderRadius: "20px" }}
              onClick={logOut}
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
      <div>
        <NormalTitle>
          <span className="text-gray-400 cursor-default">결제 서비스</span>
        </NormalTitle>
        <div className="ml-3 mt-3 flex flex-col gap-2">
          {!member && (
            <BoldTitle>
              <span onClick={() => navigate("/serviceagree")}>
                결제 서비스 가입하기
              </span>
            </BoldTitle>
          )}
          {/*TODO: QR 결제하기로 연결*/}
          {member && (
            <>
              <BoldTitle>
                <span
                  className="cursor-pointer"
                  onClick={() => handlePayment()}
                >
                  QR 결제하기
                </span>
              </BoldTitle>
              <BoldTitle>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/paymenthistory");
                  }}
                >
                  결제 내역 보기
                </span>
              </BoldTitle>
            </>
          )}
        </div>
      </div>

      <div>
        <NormalTitle>
          <span className="text-gray-400 cursor-default">한도 및 상환</span>
        </NormalTitle>

        <div className="ml-3 mt-3 flex flex-col gap-2">
          <BoldTitle>
            <span
              className="cursor-pointer"
              onClick={() => {
                if (member) openModal();
                else notifyToNonmember();
              }}
            >
              선결제하기
            </span>
          </BoldTitle>
          <BoldTitle>
            <span
              className="cursor-pointer"
              onClick={() => {
                if (member) navigate("/account");
                else notifyToNonmember();
              }}
            >
              결제 계좌 변경
            </span>
          </BoldTitle>
          <BoldTitle>
            <span
              className="cursor-pointer"
              onClick={() => {
                if (member) navigate("/limit", { state: { menu: true } });
                else notifyToNonmember();
              }}
            >
              한도 변경
            </span>
          </BoldTitle>

          <BoldTitle>
            <span
              className="cursor-pointer"
              onClick={() => {
                if (member) navigate("/stock");
                else notifyToNonmember();
              }}
            >
              담보 변경
            </span>
          </BoldTitle>

          <BoldTitle>
            <span
              className="cursor-pointer"
              onClick={() => {
                if (member) navigate("/priority", { state: { menu: true } });
                else notifyToNonmember();
              }}
            >
              우선순위 확인 및 변경
            </span>
          </BoldTitle>
          <BoldTitle>
            <span
              className="cursor-pointer"
              onClick={() => {
                if (member)
                  navigate("/repayment-history", { state: { menu: true } });
                else notifyToNonmember();
              }}
            >
              상환 내역 보기
            </span>
          </BoldTitle>
        </div>
      </div>

      <div>
        <NormalTitle>
          <span className="text-gray-400 cursor-default">자산 현황</span>
        </NormalTitle>
        <div className="ml-3 mt-3 flex flex-col gap-2">
          <BoldTitle>
            <span
              className="cursor-pointer"
              onClick={() => {
                navigate("/asset");
              }}
            >
              자산 확인하기
            </span>
          </BoldTitle>
        </div>
        <div className="mb-20"></div>
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
