import { useEffect, useState } from "react";

interface JoinProps {
  onValidChange: (isValid: boolean) => void;
}

export default function JoinInput({ onValidChange }: JoinProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [idDup, setIdDup] = useState<boolean | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [errorPsw, setErrorPsw] = useState<boolean | null>(null);
  const [checkPsw, setCheckPsw] = useState<string | null>(null);
  const [errorCheckPsw, setErrorCheckPsw] = useState<boolean | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState<boolean | null>(
    null
  );
  const [userName, setUserName] = useState<string | null>(null);

  //비밀번호 형식이 올바른지 검사하는 함수
  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{5,}$/;
    return passwordRegex.test(password);
  };

  // 전화번호 형식이 올바른지 검사하는 함수
  const validatePhoneNumber = (number: string): boolean => {
    const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
    return phoneRegex.test(number);
  };

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleUserId = (event) => {
    setUserId(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckPsw = (event) => {
    setCheckPsw(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  //TODO: 아이디 중복 검사 후 idDup 변경 여부 결정 & 에러 메시지 출력
  //TODO: 전화번호 인증 로직 추가

  useEffect(() => {
    if (password == null) setErrorPsw(null);
    //비밀번호가 형식에 맞지 않으면 경고 메시지
    else if (!validatePassword(password)) {
      setErrorPsw(true);
    } else {
      setErrorPsw(false);
    }
  }, [password, checkPsw]);

  useEffect(() => {
    if (checkPsw == null) setErrorCheckPsw(null);
    else if (!(checkPsw === password)) {
      setErrorCheckPsw(true);
    } else {
      setErrorCheckPsw(false);
    }
  }, [checkPsw, password]);

  useEffect(() => {
    if (phoneNumber == null) setErrorPhoneNumber(null);
    // 형식이 맞지 않으면 경고 메시지를 설정
    else if (!validatePhoneNumber(phoneNumber)) {
      setErrorPhoneNumber(true);
    } else {
      setErrorPhoneNumber(false); // 형식이 맞으면 경고 메시지를 지움
    }
  }, [phoneNumber]);

  const validFlag: boolean = !(
    idDup ||
    errorPsw ||
    errorCheckPsw ||
    errorPhoneNumber
  );

  useEffect(() => {
    if (
      //idDup !== null &&
      errorPsw !== null &&
      errorCheckPsw !== null &&
      errorPhoneNumber !== null
    ) {
      if (validFlag) {
        onValidChange(true);
      } else {
        onValidChange(false);
      }
    }
  }, [
    idDup,
    errorPsw,
    errorCheckPsw,
    errorPhoneNumber,
    validFlag,
    onValidChange,
  ]);

  return (
    <div className="flex flex-col gap-10">
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          실명을 입력해주세요.
        </span>
        <input
          type="text"
          name="userName"
          value={userName} // state에 저장된 이름을 input의 value로 설정
          onChange={handleUserName} // 입력이 변경될 때 state를 업데이트
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="김신한"
        />
      </label>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          아이디를 입력해주세요.
        </span>
        <input
          type="text"
          name="userId"
          value={userId} // state에 저장된 이름을 input의 value로 설정
          onChange={handleUserId} // 입력이 변경될 때 state를 업데이트
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="shinhan"
        />
        {idDup && (
          <p className="mt-2 text-sm text-red-600">
            {"중복되는 아이디입니다."}
          </p>
        )}
      </label>

      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          비밀번호를 입력해주세요.
        </span>
        <p className="block text-sm font-medium text-slate-700 text-gray-300">
          비밀번호는 특수문자, 숫자를 무조건 포함하는 5자리 이상이어야 합니다.
        </p>
        <input
          type="password"
          name="password"
          value={password} // state에 저장된 이름을 input의 value로 설정
          onChange={handlePassword} // 입력이 변경될 때 state를 업데이트
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        />
        {errorPsw && (
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
          value={checkPsw} // state에 저장된 이름을 input의 value로 설정
          onChange={handleCheckPsw} // 입력이 변경될 때 state를 업데이트
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        />
        {errorCheckPsw && (
          <p className="mt-2 text-sm text-red-600">
            {"설정한 비밀번호와 다릅니다."}
          </p>
        )}
      </label>

      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          전화번호
        </span>
        <input
          type="tel"
          name="phoneNumber"
          value={phoneNumber} // state에 저장된 전화번호를 input의 value로 설정
          onChange={handlePhoneNumber} // 입력이 변경될 때 state를 업데이트
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="000-0000-0000"
        />
        {errorPhoneNumber && (
          <p className="mt-2 text-sm text-red-600">
            {"전화번호 형식이 올바르지 않습니다. 형식) 000-0000-0000"}
          </p>
        )}
      </label>
    </div>
  );
}
