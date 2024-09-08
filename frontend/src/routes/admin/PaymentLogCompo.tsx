import { useEffect, useRef, useState } from "react";
import LogCompo from "./LogCompo";

interface LogMessage {
  id: number;
  customerId: number;
  amount: number;
  franchiseCode: number;
  isSuccess: string;
  date: string;
}

export default function PaymentLogCompo() {
  const [messages, setMessages] = useState<LogMessage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventSource = new EventSource("ws");

    eventSource.onmessage = (event) => {
      const log: LogMessage = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, log]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <div>
      <p className="w-full text-center font-bold text-2xl">실시간 결제로그</p>
      <div className="border border-solid max-h-[40vh] overflow-hidden">
        <div className="grid grid-cols-6 gap-3 text-center">
          <p>id</p>
          <p>고객id</p>
          <p>결제금액</p>
          <p>가맹점 코드</p>
          <p>성공 여부</p>
          <p>일시</p>
        </div>
        <div
          className="max-h-[40vh] overflow-y-auto border p-2 bg-gray-50"
          ref={containerRef}
        >
          {arr.map((value) => {
            return (
              <LogCompo
                id={value}
                customerId={123}
                amount={10000}
                franchiseCode={400}
                isSuccess={"성공"}
                date="2024-09-08 15:09"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
