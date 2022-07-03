import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  createReducer,
} from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"

type Count = {
  count: number
}

const initialState: Count = {
  count: 0,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    addition: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    subtraction: (state, action: PayloadAction<number>) => {
      state.count -= action.payload
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
