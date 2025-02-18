const TaskTableEmptyRow = () => {
  return (
    <tr>
      <td
        colSpan={10}
        className="table__cell table__cell_centered table__cell_empty"
      >
        No tasks
      </td>
    </tr>
  );
};

export default TaskTableEmptyRow;
