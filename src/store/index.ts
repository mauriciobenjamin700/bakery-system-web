import { configureStore } from '@reduxjs/toolkit'
 import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

// Tipos para uso com TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch