import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppDispatch } from "./store"
import { useDispatch } from "react-redux"

type Count = {
  count: number
  loading: boolean
  error: {
    status: boolean
    message: string | null
  }
}

const initialState: Count = {
  count: -2,
  loading: false,
  error: {
    status: false,
    message: null,
  },
}

const sleep = (waitTime: number) =>
  new Promise((resolve) => setTimeout(resolve, waitTime))

export const twoAsyncCount = createAsyncThunk(
  "twoAsyncCount",
  async (num: number) => {
    await sleep(3000)

    return num
  }
)

export const threeAsyncDown = createAsyncThunk(
  "threeAsyncDown",
  async (num: number) => {
    await sleep(3000)
    return num
  }
)

export const twoCounterSlice = createSlice({
  name: "twoCounter",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(twoAsyncCount.pending, (state, action) => {
      state.loading = true
      state.error.status = false
      state.error.message = null
    })
    builder.addCase(
      twoAsyncCount.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false
        state.count += action.payload
        const dispatch: AppDispatch = useDispatch()
        dispatch(threeAsyncDown(action.payload))
      }
    )
    builder.addCase(twoAsyncCount.rejected, (state, action) => {
      state.loading = true
      state.error.status = true
      state.error.message = "cannot count up"
    })
    // threeAsyncDown
    builder.addCase(threeAsyncDown.pending, (state, action) => {
      state.loading = true
      state.error.status = false
      state.error.message = null
    })
    builder.addCase(
      threeAsyncDown.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false
        state.count -= action.payload
      }
    )
    builder.addCase(threeAsyncDown.rejected, (state, action) => {
      state.loading = true
      state.error.status = true
      state.error.message = "cannot count Down!"
    })
  },
})

// export const { additionTwo, subtractionTwo } = twoCounterSlice.actions
export default twoCounterSlice.reducer
