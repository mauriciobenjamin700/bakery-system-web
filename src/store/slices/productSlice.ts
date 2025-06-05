import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProductState = {
  data: ProductResponse | null
}

const initialState: ProductState = {
  data: null
}

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductResponse>) => {
      state.data = action.payload
    },
    clearProduct: (state) => {
      state.data = null
    },
  },
})

export const { setProduct, clearProduct } = productsSlice.actions
export default productsSlice.reducer