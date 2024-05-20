import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "@/store/slices/userSlice";
import psychicsReducer from "@/store/slices/psychicsSlice";
import productReducer, {
  gettingAllProducts,
} from "@/store/slices/productSlice";
import blogReducer, { getAllBlogs } from "@/store/slices/blogSlice";
import packageReducer, { getAllPackages } from "@/store/slices/packagSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    psychics: psychicsReducer,
    products: productReducer,
    blog: blogReducer,
    packages: packageReducer,
  },
});

store.dispatch(gettingAllProducts());
store.dispatch(getAllBlogs());
store.dispatch(getAllPackages());
