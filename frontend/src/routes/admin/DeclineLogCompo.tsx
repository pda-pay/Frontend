import { useEffect, useState } from "react";
import DeclineLog from "./DeclineLog";
import adminAPI, { getMortgageDeclineI } from "../../api/adminAPI";

export default function DeclineLogCompo() {
  const service = new adminAPI();
  const [data, setData] = useState<getMortgageDeclineI[]>([]);

  const fetch = async () => {
    const result = await service.getMortgageDecline(-10);

    const d: getMortgageDeclineI[] = result.data;

    const arr = [];

    d.map((value) => {
      arr.push({
        userId: value.userId,
        mortgaged: value.mortgageSum,
        limit: value.todayLimit,
        declineRatio: value.mortgageSumRateOfChange,
      });
    });

    setData(d);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <p className="w-full text-center font-bold text-2xl">
        전일 대비 담보 하락 고객(10% 이상)
      </p>
      <div className="border border-solid max-h-[30vh] h-[30vh]">
        <div className="grid grid-cols-5 gap-3 text-center">
          <p>고객id</p>
          <p>현재 담보 총액</p>
          <p>설정한도</p>
          <p>담보유지비율</p>
          <p>전일대비 하락폭</p>
        </div>
        <div className="max-h-[29vh] overflow-y-auto border p-2 bg-gray-50">
          {data.map((value, index) => {
            return (
              <DeclineLog
                key={index}
                userId={value.userId}
                mortgaged={value.mortgageSum}
                limit={value.todayLimit}
                declineRatio={value.mortgageSumRateOfChange}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
