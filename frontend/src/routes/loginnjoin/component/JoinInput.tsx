import { useEffect, useState } from "react";

export default function JoinInput() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string>("");

  // 전화번호 형식이 올바른지 검사하는 함수
  const validatePhoneNumber = (number: string): boolean => {
    const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
    return phoneRegex.test(number);
  };

  // 입력이 변경될 때 호출되는 함수 (타입: ChangeEvent<HTMLInputElement>)
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  useEffect(() => {
    // 형식이 맞지 않으면 경고 메시지를 설정
    if (!validatePhoneNumber(phoneNumber)) {
      setError("전화번호 형식이 올바르지 않습니다. 예) 000-0000-0000");
    } else {
      setError(""); // 형식이 맞으면 경고 메시지를 지움
    }
  }, [phoneNumber]);

  return (
    <div>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          전화번호
        </span>
        <input
          type="tel"
          name="phonenumber"
          value={phoneNumber} // state에 저장된 전화번호를 input의 value로 설정
          onChange={handlePhoneNumber} // 입력이 변경될 때 state를 업데이트
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="000-0000-0000"
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
