import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '@/store/slices/userSlice'
import psychicsReducer from '@/store/slices/psychicsSlice'
import productReducer, { gettingAllProducts } from '@/store/slices/productSlice'

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    psychics : psychicsReducer,
    product : productReducer
  },
})

store.dispatch(gettingAllProducts())