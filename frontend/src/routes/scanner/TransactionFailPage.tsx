import BackgroundFrame from "../../components/backgroundframe/BackgroundFrame";
import BasicButton from "../../components/button/BasicButton";
import { useNavigate, useLocation } from "react-router-dom";

export default function TransactionFailPage() {
  const location = useLocation();
  const result = location.state;

  console.log(result);

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col p-5 py-7 justify-between">
      <p className="mt-16 text-xl text-center font-bold">
        결제에 실패했습니다.
      </p>

      <BackgroundFrame color="blue">
        <div className="h-[20vh] font-bold flex flex-col justify-between">
          <div className="mt-5 gap-y-1 flex flex-col">
            <p>결제 가맹점: {result.franchiseName}</p>
            <p>
              결제시도 금액:{" "}
              {result.triedAmount
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              원
            </p>
          </div>

          <div className="mt-5 mb-5">
            <p>실패 사유: {result.message}</p>
          </div>
        </div>
      </BackgroundFrame>

      <div className="flex flex-row-reverse">
        <BasicButton
          type="blue"
          children={"메인으로"}
          onClick={() => navigate("/main")}
        />
      </div>
    </div>
  );
}
