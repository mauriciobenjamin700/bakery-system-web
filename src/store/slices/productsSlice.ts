import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProductsState = {
  data: ProductResponse[] | null
}

const initialState: ProductsState = {
  data: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductResponse[]>) => {
      state.data = action.payload
    },
    clearProducts: (state) => {
      state.data = null
    },
  },
})

export const { setProducts, clearProducts } = productsSlice.actions
export default productsSlice.reducer