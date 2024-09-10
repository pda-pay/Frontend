import { useEffect, useRef, useState } from "react";
import LogCompo from "./LogCompo";

interface LogMessage {
  id: number;
  loginId: string;
  amount: number;
  franchiseCode: number;
  isSuccess: string;
  date: string;
}

export default function PaymentLogCompo() {
  const [messages, setMessages] = useState<LogMessage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const eventSource = useRef<EventSource | null>(null);

  useEffect(() => {
    eventSource.current = new EventSource(
      import.meta.env.VITE_BACKEND_URL + "/notification/payment"
    );

    eventSource.current.addEventListener("simple", (event) => {
      console.log(event);
      const log: LogMessage = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, log]);
    });

    return () => {
      if (eventSource.current != null) {
        eventSource.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

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
          {messages.map((value) => {
            return (
              <LogCompo
                id={value.id}
                customerId={value.loginId}
                amount={value.amount}
                franchiseCode={value.franchiseCode}
                isSuccess={value.isSuccess}
                date={value.date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
