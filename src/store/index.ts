import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./features/noteSlice";

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    note: noteSlice
  },
});

export default store;