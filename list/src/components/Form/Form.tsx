import React, { FormEvent, useEffect } from "react";
import Field from "../Field/Field.tsx";
import "./Form.scss";
import Button from "../Button/Button.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, RootState } from "../../store.ts";
import { addTask, updateTask } from "../../tasksSlice.ts";

const selectOptions: { value: string; name: string }[] = [
  { value: "low", name: "Low" },
  { value: "middle", name: "Middle" },
  { value: "high", name: "High" },
];

export interface BaseField {
  name: FieldName;
  placeholder?: string;
  label: string;
}

export interface TextField extends BaseField {
  type: "text" | "date" | "time" | "range";
  min?: number;
  max?: number;
  step?: number;
}

export interface TextareaField extends BaseField {
  type: "textarea";
  rows: number;
}

export interface SelectField extends BaseField {
  type: "select";
  selectOptions?: { value: string; name: string }[];
}

export type FormField = TextField | TextareaField | SelectField;

export const formFields = [
  {
    type: "text",
    name: "name",
    label: "Name",
    placeholder: "name for the task you’re going to do",
  },
  {
    type: "textarea",
    name: "description",
    label: "Description",
    placeholder: "description for the task",
    rows: 4,
  },
  {
    type: "text",
    name: "category",
    label: "Category",
    placeholder: "e.g. household, school, work",
  },
  { type: "date", name: "date", label: "Date" },
  { type: "time", name: "time", label: "Time" },
  {
    type: "select",
    name: "priority",
    label: "Priority",
    selectOptions: selectOptions,
  },
  {
    type: "range",
    name: "fulfillment",
    label: "Fulfillment",
    min: 0,
    max: 100,
    step: 10,
  },
] as const;

export type FieldName = (typeof formFields)[number]["name"];

const Form = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const editedId = Number(searchParams.get("id"));
  const task = useSelector((state: RootState) =>
    state.tasks.find((task) => task.id === editedId),
  );
  const [formValues, setFormValues] = React.useState(
    () =>
      (editedId && task) || {
        name: "",
        description: "",
        category: "",
        date: "",
        time: "",
        priority: "",
        fulfillment: 50,
      },
  );

  const navigate = useNavigate();

  function handleChange(name: FieldName, value: string | number) {
    setFormValues({
      ...formValues,
      [name]: name === "fulfillment" ? Number(value) : String(value),
    });
  }

  const handleAddTask = () => {
    if (editedId) {
      dispatch(updateTask({ ...formValues, id: editedId }));
    } else {
      const id = generateId();
      dispatch(addTask({ ...formValues, id }));
    }
  };

  const currentTasks = useSelector((state: IRootState) => state.tasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(currentTasks));
  }, [currentTasks]);

  function generateId() {
    const currentIdJson = localStorage.getItem("currentId");
    const currentId = currentIdJson ? parseInt(currentIdJson) : 0;
    const newId = currentId + 1;
    localStorage.setItem("currentId", JSON.stringify(currentId + 1));
    return newId;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddTask();
    navigate("/");
  };

  return (
    <form className="page-form" onSubmit={handleSubmit}>
      <h3 className="page-form__header">Add a new to-do</h3>
      {formFields.map((field) => (
        <div className="page-form__input" key={field.name}>
          <Field
            field={field}
            value={formValues[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="page-form__actions">
        <Button className="page-form__button" active={true}>
          Save
        </Button>
        <Button className="page-form__button" type="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Form;
