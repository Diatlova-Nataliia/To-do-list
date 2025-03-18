import React, { useEffect } from "react";
import { Task } from "../../api/tasks.ts";
import { useSearchParams } from "react-router-dom";
import {
  STATUS_PARAM_COMPLETED_VALUE,
  STATUS_PARAM_NAME,
  STATUS_PARAM_TODO_VALUE,
} from "../Toolbar/Toolbar.tsx";
import "./TaskTable.scss";
import TaskTableRow from "../TaskTableRow/TaskTableRow.tsx";
import TaskTableHeaderRow from "../TaskTableHeaderRow/TaskTableHeaderRow.tsx";
import TaskTableEmptyRow from "../TaskTableEmptyRow/TaskTableEmptyRow.tsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, toggleTask, updateTask } from "../../tasksSlice.ts";
import { IRootState } from "../../store.ts";

const TaskTable = ({}) => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get(STATUS_PARAM_NAME);
  const tasks = useSelector((state: IRootState) => state.tasks);

  const tasksToRender = React.useMemo(() => {
    switch (statusParam) {
      case STATUS_PARAM_COMPLETED_VALUE:
        return tasks.filter((task) => task.fulfillment === 100);
      case STATUS_PARAM_TODO_VALUE:
        return tasks.filter((task) => task.fulfillment !== 100);
      default:
        return tasks;
    }
  }, [tasks, statusParam]);

  const dispatch = useDispatch();

  const handleCheckboxChange = React.useCallback(
    (taskId?: number) => {
      if (taskId) {
        dispatch(toggleTask(taskId));
        dispatch(updateTask({ id: taskId }));
      }
    },
    [tasks],
  );

  const handleDeleteClick = React.useCallback(
    (taskId?: number) => {
      if (!taskId) return;
      dispatch(deleteTask(taskId));
    },
    [dispatch],
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <table className="table">
        <tbody>
          <>
            <TaskTableHeaderRow />
            {tasksToRender.length > 0 ? (
              tasksToRender.map((task: Task) => (
                <TaskTableRow
                  key={task.id}
                  task={task}
                  onCheckChange={handleCheckboxChange}
                  onDeleteClick={handleDeleteClick}
                />
              ))
            ) : (
              <TaskTableEmptyRow />
            )}
          </>
        </tbody>
      </table>
    </>
  );
};

export default TaskTable;
