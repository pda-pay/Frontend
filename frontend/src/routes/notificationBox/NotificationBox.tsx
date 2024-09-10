import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import notificationBoxAPI from "../../api/notificationBoxAPI";
import BoldTitle from "../../components/text/BoldTitle";
import NormalTitle from "../../components/text/NormalTitle";
import TimeText from "./component/Timetext";
import NotificationButton from "../../components/button/NotificationButton";
import NotificationDeleteButton from "../../components/button/NotificationDeleteButton";
import Container from "../../components/settingdiv/Container";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
  RiSettings3Line,
  RiDeleteBin6Fill,
} from "react-icons/ri";
import {
  MenuListBar,
  MessageBox,
  MessageBoxWrapper,
  MessageWrapper,
  TopBar,
} from "./component/Styled";

interface Message {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  category: string;
}

export const NotificationBox = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [isEditMode, setIsEditMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const categoryList = ["전체", "결제", "한도", "담보", "상환", "선결제"];

  const notificationService = new notificationBoxAPI();

  const fetchNotifications = async () => {
    try {
      const response = await notificationService.getNotifications();
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const filteredMessages = messages.filter(
    (message) =>
      selectedCategory === "전체" || message.category === selectedCategory
  );

  const toggleSelectMessage = (id: number) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(
        selectedMessages.filter((messageId) => messageId !== id)
      );
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const deleteMessages = async () => {
    try {
      await notificationService.deleteNotifications(selectedMessages);
      Swal.fire({
        icon: "success",
        title: `<span style="font-size: 20px; font-weight : bolder;">삭제되었습니다.</span>`,
        confirmButtonColor: "blue",
      }).then(() => {
        fetchNotifications();
        finishEditMode();
      });
    } catch (error) {
      console.error("Error deleting notifications: ", error);
    }
  };

  const finishEditMode = () => {
    setSelectedMessages([]);
    setIsEditMode(false);
  };

  return (
    <div className="block">
      <Container>
        <TopBar>
          {isEditMode ? (
            <>
              <div className="w-[55px]" />
              <BoldTitle>삭제할 알림 선택</BoldTitle>
              <NotificationButton
                onClick={() => finishEditMode()}
                backgroundColor="#3469F2"
                color="white"
                hoverBackgroundColor="#295ee5"
                fontSize="17px"
                marginRight="0"
              >
                완료
              </NotificationButton>
            </>
          ) : (
            <>
              <IoIosArrowBack
                className="cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <BoldTitle>알림</BoldTitle>
              <RiSettings3Line
                className="cursor-pointer"
                size="25px"
                onClick={() => setIsEditMode(true)}
              />
            </>
          )}
        </TopBar>
        <MenuListBar
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={isDragging ? "active" : ""}
        >
          {categoryList.map((category, index) => (
            <NotificationButton
              key={index}
              marginRight={index === categoryList.length - 1 ? "0" : "10px"}
              marginBottom="4px"
              backgroundColor={
                selectedCategory === category ? "#363e57" : "f0f0f0"
              }
              color={selectedCategory === category ? "white" : "black"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </NotificationButton>
          ))}
        </MenuListBar>
      </Container>
      <MessageWrapper padding={isEditMode ? "20px 20px 100px 20px" : "20px"}>
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-[60px]">
            <FaEnvelopeOpenText size="100px" color="#363e57" />
            <BoldTitle>알림이 없습니다.</BoldTitle>
          </div>
        ) : (
          <>
            {filteredMessages.map((message, index) => (
              <MessageBoxWrapper key={index}>
                {isEditMode ? (
                  <>
                    {selectedMessages.includes(message.id) ? (
                      <RiCheckboxCircleFill
                        size="25px"
                        color="#3469F2"
                        className="mb-[5px] cursor-pointer"
                        onClick={() => toggleSelectMessage(message.id)}
                      />
                    ) : (
                      <RiCheckboxBlankCircleLine
                        size="25px"
                        color="#aeaeae"
                        className="mb-[5px] cursor-pointer"
                        onClick={() => toggleSelectMessage(message.id)}
                      />
                    )}
                  </>
                ) : (
                  <></>
                )}
                <MessageBox key={index} className="shadow-lg">
                  <BoldTitle>{message.title}</BoldTitle>
                  <NormalTitle>{message.content}</NormalTitle>
                  <TimeText>{message.createdAt.replace("T", " ")}</TimeText>
                </MessageBox>
              </MessageBoxWrapper>
            ))}
          </>
        )}
      </MessageWrapper>
      <NotificationDeleteButton
        display={isEditMode ? "flex" : "none"}
        disabled={selectedMessages.length === 0 ? true : false}
        onClick={() => deleteMessages()}
      >
        <RiDeleteBin6Fill size="22px" />
        삭제
      </NotificationDeleteButton>
    </div>
  );
};

export default NotificationBox;
