import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "@/store/slices/userSlice";
import psychicsReducer from "@/store/slices/psychicsSlice";
import productReducer, {
  gettingAllProducts,
} from "@/store/slices/productSlice";
import blogReducer, { getAllBlogs } from "@/store/slices/blogSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    psychics: psychicsReducer,
    products: productReducer,
    blog: blogReducer,
  },
});

store.dispatch(gettingAllProducts());
store.dispatch(getAllBlogs());
