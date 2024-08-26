import { useState } from "react";

export default function LoginInput() {
  const [userId, setUserId] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const handleUserId = (event) => {
    setUserId(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex flex-col gap-10">
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
      </label>

      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          비밀번호를 입력해주세요.
        </span>
        <input
          type="password"
          name="password"
          value={password} // state에 저장된 이름을 input의 value로 설정
          onChange={handlePassword} // 입력이 변경될 때 state를 업데이트
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        />
      </label>
    </div>
  );
}
