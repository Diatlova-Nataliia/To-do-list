import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  name?: string;
  description?: string;
  category?: string;
  date?: string;
  time?: string;
  priority?: string;
  fulfillment?: number;
  id?: number;
}

const tasksJson = localStorage.getItem("tasks");
const initialState: Task[] = tasksJson ? JSON.parse(tasksJson) : [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const taskToUpdate = state.find(
        (task: Task) => task.id === action.payload.id,
      );
      if (taskToUpdate) {
        Object.assign(taskToUpdate, action.payload);
      }
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const taskToCheck = state.find(
        (task: Task) => task.id === action.payload,
      );
      if (taskToCheck) {
        taskToCheck.fulfillment = taskToCheck.fulfillment === 100 ? 0 : 100;
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, toggleTask } =
  taskSlice.actions;
export default taskSlice.reducer;
