import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    addition: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    subtraction: (state, action: PayloadAction<number>) => {
      state.count -= action.payload
    },
  },
})

export const { addition, subtraction } = counterSlice.actions
export default counterSlice.reducer
