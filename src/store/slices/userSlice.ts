import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserState = {
  data: UserResponse | null
}

const initialState: UserState = {
  data: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponse>) => {
      state.data = action.payload
    },
    clearUser: (state) => {
      state.data = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer