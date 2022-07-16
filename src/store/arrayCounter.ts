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
    addition: (state, action: PayloadAction<number>) => {
      state.arrayCount = state.arrayCount.concat(action.payload)
    },
  },
})

export const { addition } = arrayCounterSlice.actions
export default arrayCounterSlice.reducer
