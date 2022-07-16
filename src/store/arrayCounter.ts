import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type State = {
  arrayCount: number[]
}

const initialState: State = {
  arrayCount: [],
}

export const arrayCounterSlice = createSlice({
  name: "arrayCounter",
  initialState: initialState,
  reducers: {
    arrayAddition: (state, action: PayloadAction<number[]>) => {
      state.arrayCount = action.payload
    },
  },
})

export const { arrayAddition } = arrayCounterSlice.actions
export default arrayCounterSlice.reducer
