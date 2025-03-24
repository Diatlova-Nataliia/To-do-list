import React from "react";
import "./Input.scss";
import { FieldName } from "../Form/Form.tsx";

interface InputProps {
  className: string;
  placeholder?: string;
  name: FieldName;
  id: string;
  min?: number;
  max?: number;
  value?: string | number;
  step?: number;
  type?: string;
  required?: boolean;
  onChange: (name: FieldName, value: string | number) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  name,
  placeholder,
  min,
  max,
  value,
  step,
  type,
  onChange,
  required,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };
  if (typeof value === "number") {
    return (
      <input
        type={type}
        className={`${className} range__input `}
        name={name}
        id={name}
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={handleInputChange}
      />
    );
  }
  return (
    <input
      type={type}
      className={`${className} input__input `}
      name={name}
      placeholder={placeholder}
      id={name}
      required={required}
      value={value ?? ""}
      onChange={handleInputChange}
    />
  );
};

export default Input;
