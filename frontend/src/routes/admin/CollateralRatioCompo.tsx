import { useEffect, useState } from "react";
import CollateralCompo, { CollateralCompoProps } from "./CollateralCompo";
import adminAPI from "../../api/adminAPI";

export default function CollateralRatioCompo() {
  const [data, setData] = useState<CollateralCompoProps[]>([]);
  const service = new adminAPI();

  const fetch = async () => {
    const res = await service.getCollateralData();
    const d: CollateralCompoProps[] = res.data;
    d.sort((a, b) => a.ratio - b.ratio);

    setData(d);
  };

  useEffect(() => {
    fetch();
  }, []);

  const ids = ["avc", "qwe", "ggs", "sadsad", "eq121", "12sf"];
  const arr = [150, 160, 142, 121, 100, 155];

  arr.sort((a, b) => a - b);

  return (
    <div>
      <p className="w-full text-center font-bold text-2xl">담보유지비율 현황</p>
      <div className="border border-solid max-h-[40vh] h-[40vh]">
        <div className="grid grid-cols-4 gap-3 text-center">
          <p>고객id</p>
          <p>담보 총액</p>
          <p>설정한도</p>
          <p>담보유지비율</p>
        </div>
        <div className="max-h-[40vh] overflow-y-auto border p-2 bg-gray-50">
          {arr.map((value, index) => {
            return (
              <CollateralCompo
                customerId={ids[index]}
                mortgaged={1000000}
                limit={1000000}
                ratio={value}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
