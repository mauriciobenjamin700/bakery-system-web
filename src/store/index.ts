import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import productsReducer from './slices/productsSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    products: productsReducer,
    user: userReducer,
  },
})

// Tipos para uso com TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch