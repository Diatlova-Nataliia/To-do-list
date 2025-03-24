import { formFields } from "../Form/Form.tsx";

const TaskTableHeaderRow = () => {
  return (
    <tr className="table__row_header">
      <th className="table__cell table__cell_header table__cell_action"></th>
      {formFields.map((formField) => (
        <th key={formField.label} className="table__cell table__cell_header">
          {formField.label}
        </th>
      ))}
      <th className="table__cell table__cell_header table__cell_action"></th>
      <th className="table__cell table__cell_header table__cell_action"></th>
    </tr>
  );
};

export default TaskTableHeaderRow;
