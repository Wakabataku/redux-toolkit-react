import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"

type Count = {
  countOne: number
}

const initialState: Count = {
  countOne: 0,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    addition: (state, action: PayloadAction<number>) => {
      state.countOne += action.payload
    },
    subtraction: (state, action: PayloadAction<number>) => {
      state.countOne -= action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      // state.count = initialState.count
      Object.assign(state, initialState)
    })
  },
})

export const { addition, subtraction } = counterSlice.actions
export default counterSlice.reducer
