import BasicButton from "../../../components/button/BasicButton";

interface ButtonProps {
  handlePage: (p: number) => void;
  clickFinishButton: () => void;
}

export default function SelectedStockButtonbar({
  handlePage,
  clickFinishButton,
}: ButtonProps) {
  return (
    <div
      className="flex justify-between
    "
    >
      <BasicButton
        type="gray"
        onClick={() => {
          handlePage(0);
        }}
      >
        이전
      </BasicButton>
      <BasicButton
        type="blue"
        onClick={() => {
          clickFinishButton();
          handlePage(0);
        }}
      >
        완료
      </BasicButton>
    </div>
  );
}
