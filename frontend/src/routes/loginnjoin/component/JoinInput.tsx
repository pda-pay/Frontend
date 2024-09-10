import { useEffect, useState } from "react";
import certificatePhoneNumberAPI from "../../../api/certificateNumberAPI";
import CertificateModal from "./CertificateModal";
import joinApi from "../../../api/joinAPI";
import axios from "axios";

interface JoinProps {
  onValidChange: (isValid: boolean) => void;
  handleUserInfo: (index: number, value: string) => void;
}

export default function JoinInput({
  onValidChange,
  handleUserInfo,
}: JoinProps) {
  const certiservice = new certificatePhoneNumberAPI();
  const joinservice = new joinApi();

  const [errCallMsg, setErrCallMsg] = useState<string>();

  const [userName, setUserName] = useState<string>();
  const [errorName, setErrorName] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string>();
  const [idDup, setIdDup] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string>();
  const [errorPsw, setErrorPsw] = useState<boolean | null>(null);
  const [checkPsw, setCheckPsw] = useState<string>();
  const [errorCheckPsw, setErrorCheckPsw] = useState<boolean | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [errorPhoneNumber, setErrorPhoneNumber] = useState<boolean | null>(
    null
  );
  //인증실패
  const [errorCerti, setErrorCerti] = useState<boolean | null>(null);
  //인증여부
  const [certiCheck, setCertiCheck] = useState<boolean | null>(null);
  //중복 확인 여부
  const [dupCheck, setDupCheck] = useState<boolean | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean | null>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //이름이 올바른지 검사하는 함수
  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z가-힣]*$/;
    console.log("유효성검사: " + name.length);
    if (name === "" || name === undefined || name.length === 0) {
      if (name.length === 0) setUserName(undefined);
      console.log("여기 걸려야함");
      return true;
    }
    return nameRegex.test(name);
  };

  //비밀번호 형식이 올바른지 검사하는 함수
  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
    return passwordRegex.test(password);
  };

  // 전화번호 형식이 올바른지 검사하는 함수
  const validatePhoneNumber = (number: string): boolean => {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(number);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    handleUserInfo(2, event.target.value);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
    handleUserInfo(0, event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    handleUserInfo(1, event.target.value);
  };

  const handleCheckPsw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPsw(event.target.value);
  };

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
    handleUserInfo(3, event.target.value);
  };

  const handleCerti = (value: boolean) => {
    setErrorCerti(!value);
  };

  const checkIdDuplicate = async () => {
    setDupCheck(true);
    try {
      const response = await joinservice.postUserId({
        loginId: userId,
      });

      if (response.status === 200) {
        setIdDup(!response.data.isAvailable);
        console.log(response.data.isAvailable);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("에러 발생: " + error);
      }
    }
  };

  const certificatePhone = async () => {
    try {
      const response = await certiservice.postPhoneNumber({
        phoneNumber: phoneNumber,
      });

      if (response.status === 202) {
        openModal();
        setCertiCheck(true);
      } else if (response.status === 400 || response.status === 500) {
        console.log((await response).data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //console.log("에러 발생: " + error);
        setErrCallMsg(error.response?.data.message);
      }
    }
  };

  const handleCertiPhone = () => {
    if (!errorPhoneNumber) certificatePhone();
  };

  //TODO: 아이디 중복 검사 후 idDup 변경 여부 결정 & 에러 메시지 출력
  const handleDupId = () => {
    checkIdDuplicate();
    setDupCheck(true);
  };

  useEffect(() => {
    console.log("변경: " + userName?.length);
    if (userName === undefined) setErrorName(true);
    else if (!validateName(userName)) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  }, [userName]);

  useEffect(() => {
    if (password === undefined) setErrorPsw(true);
    //비밀번호가 형식에 맞지 않으면 경고 메시지
    else if (!validatePassword(password)) {
      setErrorPsw(true);
    } else {
      setErrorPsw(false);
    }
  }, [password, checkPsw]);

  useEffect(() => {
    if (checkPsw === undefined) setErrorCheckPsw(true);
    else if (!(checkPsw === password)) {
      setErrorCheckPsw(true);
    } else {
      setErrorCheckPsw(false);
    }
  }, [checkPsw, password]);

  useEffect(() => {
    if (phoneNumber === undefined) setErrorPhoneNumber(true);
    // 형식이 맞지 않으면 경고 메시지를 설정
    else if (!validatePhoneNumber(phoneNumber)) {
      setErrorPhoneNumber(true);
    } else {
      setErrorPhoneNumber(false); // 형식이 맞으면 경고 메시지를 지움
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (userName !== undefined) validateName(userName);
    else setErrorName(true);
  }, [userName]);

  useEffect(() => {
    setCertiCheck(null);
  }, [phoneNumber]);

  useEffect(() => {
    setErrorCerti(null);
  }, [phoneNumber]);

  useEffect(() => {
    setIdDup(null);
  }, [userId]);

  useEffect(() => {
    setDupCheck(null);
  }, [userId]);

  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    const temp: boolean | null =
      !errorName &&
      !idDup &&
      dupCheck &&
      !errorPsw &&
      !errorCheckPsw &&
      !errorPhoneNumber &&
      !errorCerti &&
      certiCheck;
    if (temp !== null) setValid(temp);
    else if (temp === null) setValid(false);
  }, [
    errorName,
    idDup,
    dupCheck,
    errorPsw,
    errorCheckPsw,
    errorPhoneNumber,
    errorCerti,
    certiCheck,
  ]);

  useEffect(() => {
    setErrCallMsg("");
  }, [phoneNumber]);

  useEffect(() => {
    onValidChange(valid);
  }, [valid]);

  return (
    <div className="flex flex-col gap-10">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          실명을 입력해주세요.
        </span>
        <input
          type="text"
          name="userName"
          pattern="[a-zA-Z가-힣]*"
          value={userName}
          onChange={handleUserName}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="김신한"
        />
        {errorName && userName !== undefined && errorName !== null && (
          <p className="mt-2 text-sm text-red-600">
            {"특수문자와 숫자 입력 불가합니다."}
          </p>
        )}
      </label>
      <label className="block">
        <div className="flex justify-between items-center">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            아이디를 입력해주세요.
          </span>
          <button
            className="text-xs"
            style={{ backgroundColor: "#9abade33", borderRadius: "20px" }}
            onClick={handleDupId}
          >
            아이디 중복 확인하기
          </button>
        </div>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={handleUserId}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="shinhan"
        />
        {idDup && userId !== undefined && idDup !== null && (
          <p className="mt-2 text-sm text-red-600">
            {"중복되는 아이디입니다."}
          </p>
        )}
        {!idDup && userId !== undefined && idDup !== null && (
          <p className="mt-2 text-sm text-blue-600">
            {"사용가능한 아이디 입니다."}
          </p>
        )}
      </label>

      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          비밀번호를 입력해주세요.
        </span>
        <p className="block text-xs font-thin text-gray-400">
          비밀번호는 특수문자, 숫자를 무조건 포함하는 8자리 이상이어야 합니다.
        </p>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        />
        {errorPsw && password !== undefined && errorPsw !== null && (
          <p className="mt-2 text-sm text-red-600">
            {"형식에 맞지 않는 비밀번호입니다."}
          </p>
        )}
      </label>

      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          비밀번호를 다시 입력해주세요.
        </span>
        <input
          type="password"
          name="password"
          value={checkPsw}
          onChange={handleCheckPsw}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        />
        {errorCheckPsw &&
          errorCheckPsw !== null &&
          password !== undefined &&
          checkPsw !== undefined && (
            <p className="mt-2 text-sm text-red-600">
              {"설정한 비밀번호와 다릅니다."}
            </p>
          )}
      </label>

      <label className="block">
        <div className="flex justify-between items-center">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            전화번호를 입력하고 인증해주세요.
          </span>
          {errorCerti !== null &&
          !errorCerti &&
          certiCheck !== null &&
          certiCheck ? (
            <p className="mt-2 text-sm text-blue-600">{"인증완료"}</p>
          ) : (
            <button
              className="text-xs"
              style={{ backgroundColor: "#9abade33", borderRadius: "20px" }}
              onClick={handleCertiPhone}
            >
              전화번호 인증하기
            </button>
          )}
        </div>

        <input
          type="tel"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumber}
          pattern="[0-9]{11}"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="00000000000"
        />

        {errorPhoneNumber &&
          phoneNumber !== undefined &&
          errorPhoneNumber !== null && (
            <p className="mt-2 text-sm text-red-600">
              {
                "전화번호 형식이 올바르지 않습니다. - 를 제거한 숫자만 입력해주세요."
              }
            </p>
          )}
        {errCallMsg !== "" && (
          <p className="mt-2 text-sm text-red-600">{errCallMsg}</p>
        )}
      </label>
      {isModalOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <CertificateModal
            phoneNumber={phoneNumber}
            isModalOpen={isModalOpen}
            handleCloseModal={closeModal}
            handleCertiCheck={handleCerti}
          />
        </div>
      )}
    </div>
  );
}
