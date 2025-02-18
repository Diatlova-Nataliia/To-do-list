import React from "react";
import "./TextArea.scss";
import { FieldName } from "../Form/Form.tsx";

interface TextAreaProps {
  className: string;
  placeholder?: string;
  name: FieldName;
  rows?: number;
  id: string;
  value?: string | number;
  onChange: (name: FieldName, value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  className,
  name,
  placeholder,
  rows,
  value,
  onChange,
}) => {
  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onChange(name, event.target.value);
  };
  return (
    <textarea
      className={`${className} textarea__textarea `}
      name={name}
      placeholder={placeholder}
      id={name}
      rows={rows}
      value={value}
      onChange={handleTextAreaChange}
    />
  );
};

export default TextArea;
