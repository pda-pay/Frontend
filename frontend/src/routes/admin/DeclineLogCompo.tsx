import DeclineLog from "./DeclineLog";

export default function DeclineLogCompo() {
  const arr = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <p className="w-full text-center font-bold text-2xl">
        전일 대비 담보 하락 고객(10% 이상)
      </p>
      <div className="border border-solid max-h-[40vh] h-[40vh]">
        <div className="grid grid-cols-5 gap-3 text-center">
          <p>고객id</p>
          <p>현재 담보 총액</p>
          <p>설정한도</p>
          <p>담보유지비율</p>
          <p>전일대비 하락폭</p>
        </div>
        <div className="max-h-[40vh] overflow-y-auto border p-2 bg-gray-50">
          {arr.map((value) => {
            return (
              <DeclineLog
                userId={value.toString()}
                mortgaged={1000000}
                limit={500000}
                declineRatio={21}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
