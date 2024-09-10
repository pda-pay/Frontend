import { useEffect, useRef, useState } from "react";
import RepaymentLog from "./RepaymentLog";

export default function RepaymentLogCompo() {
  interface LogMessage {
    id: number;
    loginId: string;
    amount: number;
    accountNumber: string;
    type: string;
    date: string;
  }
  const [messages, setMessages] = useState<LogMessage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const repaymentEventSource = useRef<EventSource | null>(null);
  const offsetAlltEventSource = useRef<EventSource | null>(null);
  const offsetNottEventSource = useRef<EventSource | null>(null);

  useEffect(() => {
    repaymentEventSource.current = new EventSource(
      import.meta.env.VITE_BACKEND_URL + "/notification/repayment"
    );

    repaymentEventSource.current.addEventListener("repayment", (event) => {
      console.log(event);
      const log: LogMessage = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, log]);
    });

    offsetAlltEventSource.current = new EventSource(
      import.meta.env.VITE_BACKEND_URL + "/notification/offset/all-payed"
    );

    offsetAlltEventSource.current.addEventListener("repayment", (event) => {
      console.log(event);
      const log: LogMessage = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, log]);
    });

    offsetNottEventSource.current = new EventSource(
      import.meta.env.VITE_BACKEND_URL + "/notification/offset/not-all-payed"
    );

    offsetNottEventSource.current.addEventListener("repayment", (event) => {
      console.log(event);
      const log: LogMessage = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, log]);
    });

    return () => {
      if (repaymentEventSource.current != null) {
        offsetAlltEventSource.current?.close();
        offsetNottEventSource.current?.close();
        repaymentEventSource.current.close();
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
          className="max-h-[35vh] overflow-y-auto border p-2 bg-gray-50"
          ref={containerRef}
        >
          {messages.map((value) => {
            return (
              <RepaymentLog
                id={value.id}
                customerId={value.loginId}
                amount={value.amount}
                accountNumber={value.accountNumber}
                type={value.type}
                date={value.date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
