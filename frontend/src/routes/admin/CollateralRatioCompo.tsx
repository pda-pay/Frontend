import { useEffect, useState } from "react";
import CollateralCompo, { CollateralCompoProps } from "./CollateralCompo";
import adminAPI, { getCollateralDataI } from "../../api/adminAPI";

export default function CollateralRatioCompo() {
  const [data, setData] = useState<CollateralCompoProps[]>([]);
  const service = new adminAPI();

  const fetch = async () => {
    const res = await service.getCollateralData();
    const d: getCollateralDataI[] = res.data;

    const da: CollateralCompoProps[] = d.map((value) => {
      return {
        customerId: value.userId,
        mortgaged: value.mortgageSum,
        limit: value.todayLimit,
        ratio: value.marginRequirement,
      };
    });

    da.sort((a, b) => a.ratio - b.ratio);

    setData(da);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <p className="w-full text-center font-bold text-2xl">
        담보유지비율 현황(160%이하)
      </p>
      <div className="border border-solid max-h-[40vh] h-[40vh]">
        <div className="grid grid-cols-4 gap-3 text-center">
          <p>고객id</p>
          <p>담보 총액</p>
          <p>설정한도</p>
          <p>담보유지비율</p>
        </div>
        <div className="max-h-[40vh] overflow-y-auto border p-2 bg-gray-50">
          {data.map((value) => {
            return (
              <CollateralCompo
                customerId={value.customerId}
                mortgaged={value.mortgaged}
                limit={value.limit}
                ratio={value.ratio}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
