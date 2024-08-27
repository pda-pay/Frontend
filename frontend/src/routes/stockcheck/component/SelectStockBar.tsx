import { useState } from "react";
import Select from "react-select";

export default function SelectStockBar() {
  const range = [{ value: 20 }, { value: 15 }, { value: 10 }, { value: 5 }];
  const [selectCount, setSelectCount] = useState<number>(20);
  return (
    <Select options={range} onChange={setSelectCount} defaultValue={range[0]} />
  );
}
