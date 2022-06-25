import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const twoCounterSlice = createSlice({
  name: "twoCounter",
  initialState: {
    count: -2,
  },
  reducers: {
    additionTwo: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    subtractionTwo: (state, action: PayloadAction<number>) => {
      state.count -= action.payload
    },
  },
})

export const { additionTwo, subtractionTwo } = twoCounterSlice.actions
export default twoCounterSlice.reducer
