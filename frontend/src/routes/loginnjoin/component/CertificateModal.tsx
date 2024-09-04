import React, { useState } from "react";
import axios from "axios";
import NormalTitle from "../../../components/text/NormalTitle";
import BasicModal from "../../../components/modal/BasicModal";
import XButton from "../../../components/button/XButton";
import MoveButton from "../../../components/button/MoveButton";
import certificatePhoneNumberAPI from "../../../api/certificateNumberAPI";

interface ModalProps {
  phoneNumber: string | undefined;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleCertiCheck: (value: boolean) => void;
}

export default function CertificateModal({
  phoneNumber,
  isModalOpen,
  handleCloseModal,
  handleCertiCheck,
}: ModalProps) {
  const certiservice = new certificatePhoneNumberAPI();

  const [code, setCode] = useState<string>("");
  const [validCode, setValidCode] = useState<boolean | null>(null);

  const updateCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  //인증코드 검증
  const validateInputCode = async () => {
    try {
      const response = await certiservice.postCode({
        phoneNumber: phoneNumber,
        code: code,
      });

      if (response.status === 200) {
        //여기서 버튼 비활성화 state 관리
        setValidCode(true);
        handleCertiCheck(true);
        console.log((await response).data.message);
      } else if (response.status === 400 || response.status === 500) {
        console.log((await response).data.message);
        //여기서 에러 메시지 출력하고 state 버튼 비호라성황
        setValidCode(false);
        handleCertiCheck(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setValidCode(false);
        handleCertiCheck(false);
        console.log("에러 발생: " + error);
      }
      // setValidCode(false);
      // if (error.response) {
      //   console.log("에러 발생: " + error);
      // }
    }
  };

  return (
    <BasicModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
      <div className="flex flex-row-reverse">
        <span onClick={handleCloseModal}>
          <XButton />
        </span>
      </div>
      <NormalTitle>
        문자로 온 인증번호를 입력해주세요.
        <label className="block">
          <input
            type="text"
            name="code"
            value={code}
            onChange={updateCode}
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          />
          {validCode !== null && !validCode && (
            <p className="mt-2 text-sm text-red-600">
              {"올바른 인증코드가 아닙니다. "}
            </p>
          )}
          {validCode && (
            <p className="mt-2 text-sm text-blue-600">
              {"인증이 완료되었습니다."}
            </p>
          )}
        </label>
        {!validCode ? (
          <MoveButton onClick={validateInputCode}>입력완료</MoveButton>
        ) : (
          <MoveButton onClick={handleCloseModal}>닫기</MoveButton>
        )}
      </NormalTitle>
    </BasicModal>
  );
}
