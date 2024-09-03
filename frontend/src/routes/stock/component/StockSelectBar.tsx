import Select from "react-select";

interface SelectProps {
  index: number;
  count: number;
  amount: number;
  handleSelectedStock: (index: number, amount: number) => void;
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: "100%", // control 높이를 부모 div 높이에 맞춤
    height: "100%", // 고정 높이
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    height: "100%", // 내부 값 컨테이너 높이를 맞춤
    padding: "0 8px",
  }),
  input: (provided: any) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: "100%", // 드롭다운 아이콘 컨테이너 높이 맞춤
  }),
  menu: (provided: any) => ({
    ...provided,
    maxHeight: "150px", // 옵션 목록의 최대 높이 설정
  }),
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: "70px", // 옵션 목록의 최대 높이 설정
    overflowY: "auto", // 스크롤 설정
  }),
};

export default function StockSelectBar({
  index,
  count,
  amount,
  handleSelectedStock,
}: SelectProps) {
  const range: { value: number; label: number }[] = [];
  for (let i = 0; i <= count; i++) {
    range.push({ value: i, label: i });
  }

  console.log("선택한 주식량" + amount);
  const onChangeSelected = (selected: any) => {
    console.log("onChangeSelected");
    if (
      selected &&
      selected.value !== null &&
      selected &&
      selected.value !== undefined
    ) {
      handleSelectedStock(index, selected.value);
    }
  };

  return (
    <Select
      options={range}
      value={range[amount]}
      onChange={onChangeSelected}
      styles={customStyles}
    />
  );
}
