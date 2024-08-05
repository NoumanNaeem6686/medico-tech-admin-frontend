import { configureStore } from "@reduxjs/toolkit";
import adminReducer, { getCurrentAdmin } from "@/store/slices/userSlice";
import psychicsReducer, {
  gettingAllPsychics,
} from "@/store/slices/psychicsSlice";
import productReducer, {
  gettingAllProducts,
} from "@/store/slices/productSlice";
import blogReducer, { getAllBlogs } from "@/store/slices/blogSlice";
import packageReducer, { getAllPackages } from "@/store/slices/packagSlice";
import customerHistoryReducer, {
  gettingAllCustomerHistories,
} from "@/store/slices/customerHistorySlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    psychics: psychicsReducer,
    products: productReducer,
    blog: blogReducer,
    packages: packageReducer,
    customerHistory: customerHistoryReducer,
  },
});

store.dispatch(gettingAllProducts());
store.dispatch(gettingAllCustomerHistories());
store.dispatch(getCurrentAdmin());
store.dispatch(getAllBlogs());
store.dispatch(getAllPackages());
store.dispatch(gettingAllPsychics());
