import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '@/store/slices/userSlice'
import psychicsReducer from '@/store/slices/psychicsSlice'

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    psychics : psychicsReducer
  },
})