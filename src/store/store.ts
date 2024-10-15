import { configureStore } from "@reduxjs/toolkit";
import adminReducer, { getCurrentAdmin } from "@/store/slices/userSlice";


import blogReducer, { getAllBlogs } from "@/store/slices/blogSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    blog: blogReducer,
  },
});

store.dispatch(getCurrentAdmin());
store.dispatch(getAllBlogs());
