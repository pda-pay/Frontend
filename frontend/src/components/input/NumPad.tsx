import { useState } from "react";
import LargeButton from "../button/LargeButton";
import { useNavigate } from "react-router-dom";

export default function NumPad() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInput = (num: string) => {
    if (num === "<-") {
      const rawValue = inputValue.replace(/,/g, "");
      const newValue = rawValue.slice(0, -1);
      setInputValue(new Intl.NumberFormat().format(Number(newValue)));
      return;
    }

    const rawValue = inputValue.replace(/,/g, "");
    if (rawValue.length >= 8) return;

    const newValue = rawValue + num;
    setInputValue(new Intl.NumberFormat().format(Number(newValue)));
  };

  const onBtnClick = () => {
    if (inputValue === "0" || inputValue === "") return;

    navigate("/franchise/qr", {
      state: { amount: Number(inputValue.replace(/,/g, "")) },
    });
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen">
      <p className="text-2xl font-bold">결제할 금액을 입력해주세요</p>
      <input
        type="text"
        value={inputValue}
        readOnly
        className="mb-4 text-center text-lg p-2 border border-gray-300 rounded w-full"
        placeholder="금액"
      />
      <div className="w-full space-y-2">
        <Pad onInput={handleInput} />
        <LargeButton
          children={"QR코드 생성"}
          type="blue"
          onClick={onBtnClick}
        />
      </div>
    </div>
  );
}

type PadProps = {
  onInput: (input: string) => void;
};

function Pad({ onInput }: PadProps) {
  const buttons = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "00",
    "0",
    "<-",
  ];

  return (
    <div className="grid grid-cols-3 gap-2 w-full h-[30vh] text-2xl">
      {buttons.map((num, index) => (
        <button
          key={index}
          onClick={() => onInput(num)}
          className="text-black font-bold py-2 px-4 rounded hover:bg-gray-400"
        >
          {num}
        </button>
      ))}
    </div>
  );
}
