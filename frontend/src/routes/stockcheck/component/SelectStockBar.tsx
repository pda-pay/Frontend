import { useState, useEffect } from "react";
import Select from "react-select";

interface SelectProps {
  count: number;
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

export default function SelectStockBar({ count }: SelectProps) {
  const [selectCount, setSelectCount] = useState<number>(0);

  const range: { value: number; label: number }[] = [];
  for (let i = count; i >= 0; i--) {
    range.push({ value: i, label: i });
  }

  const handleSelectedChange = (selected: any) => {
    if (
      selected &&
      selected.value !== null &&
      selected &&
      selected.value !== undefined
    ) {
      setSelectCount(selected.value);
    }
  };

  // selected 상태가 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log(selectCount);
  }, [selectCount]);

  return (
    <Select
      options={range}
      defaultValue={range[0]}
      onChange={handleSelectedChange}
      styles={customStyles}
    />
  );
}
