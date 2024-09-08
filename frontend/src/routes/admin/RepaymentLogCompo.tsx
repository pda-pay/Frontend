import { useEffect, useRef, useState } from "react";
import RepaymentLog from "./RepaymentLog";

export default function RepaymentLogCompo() {
  interface LogMessage {
    id: number;
    customerId: number;
    amount: number;
    accountNumber: number;
    type: string;
  }

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
      <p className="w-full text-center font-bold text-2xl">실시간 상환로그</p>
      <div className="border border-solid max-h-[40vh]">
        <div className="grid grid-cols-6 gap-3 text-center items-center">
          <p>id</p>
          <p>고객id</p>
          <p>상환금액</p>
          <p>
            상환
            <br />
            계좌번호
          </p>
          <p>상환 타입</p>
          <p>일시</p>
        </div>
        <div
          className="max-h-[40vh] overflow-y-auto border p-2 bg-gray-50"
          ref={containerRef}
        >
          {arr.map((value) => {
            return (
              <RepaymentLog
                id={value}
                customerId={"wonwoo42"}
                amount={100000}
                accountNumber={"110-155-172738"}
                type={"정상상환"}
                date={"2024-09-08 09:00"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
