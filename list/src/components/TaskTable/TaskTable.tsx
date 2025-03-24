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
import { deleteTask, toggleTask } from "../../tasksSlice.ts";
import { RootState } from "../../store.ts";
import { isMobile } from "../MainPage/MainPage.tsx";
import MobileCardsContainer from "../MobileCardsContainer/MobileCardsContainer.tsx";

const TaskTable = ({}) => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get(STATUS_PARAM_NAME);
  const tasks = useSelector((state: RootState) => state.tasks);

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
      }
    },
    [dispatch],
  );

  const handleDeleteClick = React.useCallback(
    (taskId?: number) => {
      if (!taskId) return;
      dispatch(deleteTask(taskId));
    },
    [dispatch],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, 500); // ✅ Запись через 500 мс уменьшает нагрузку
    return () => clearTimeout(timeout);
  }, [tasks]);

  return isMobile ? (
    <MobileCardsContainer
      tasks={tasks}
      onDeleteClick={handleDeleteClick}
      onCheckChange={handleCheckboxChange}
    />
  ) : (
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
