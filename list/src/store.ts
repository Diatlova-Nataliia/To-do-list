import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasksSlice.ts";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type IRootState = ReturnType<typeof store.getState>;
export default store;
