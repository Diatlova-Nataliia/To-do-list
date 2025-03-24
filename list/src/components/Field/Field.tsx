import React from "react";
import Input from "../Input/Input.tsx";
import TextArea from "../TextArea/TextArea.tsx";
import Select from "../Select/Select.tsx";
import "./Field.scss";
import { FieldName, FormField } from "../Form/Form.tsx";

interface FieldProps {
  field: FormField;
  className?: string;
  value?: number | string;
  onChange: (name: FieldName, value: string | number) => void;
}

const Field: React.FC<FieldProps> = ({ field, value, onChange, ...props }) => {
  let inputElement;

  const componentMap = {
    text: Input,
    date: Input,
    time: Input,
    range: Input,
    select: Select,
    textarea: TextArea,
  };

  const Component = componentMap[field.type] || Input;
  inputElement = (
    <Component
      className="field__control"
      id={field.name}
      name={field.name}
      type={field.type}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
      {...props}
      {...(field.type === "select" && { selectOptions: field.selectOptions })}
      {...(field.type === "textarea" && { rows: field.rows })}
      {...(field.type === "range" && {
        min: field.min,
        max: field.max,
        step: field.step,
      })}
      {...((field.type === "text" ||
        field.type === "date" ||
        field.type === "time") && {
        required: field.required,
      })}
    />
  );

  return (
    <>
      <div className="field">
        <label className="field__label" htmlFor={field.name}>
          {field.label}
        </label>
        {inputElement}
      </div>
    </>
  );
};

export default Field;
