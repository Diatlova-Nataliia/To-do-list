import React from "react";
import "./Select.scss";
import { FieldName } from "../Form/Form.tsx";

interface SelectProps {
  className: string;
  name: FieldName;
  selectOptions?: { value: string; name: string }[];
  id: string;
  onChange: (name: FieldName, value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  className,
  name,
  onChange,
  selectOptions = [],
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(name, event.target.value);
  };
  return (
    <select
      className={`${className} select__select `}
      name={name}
      id={name}
      onChange={handleSelectChange}
    >
      {selectOptions.map((option) => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
