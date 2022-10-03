import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { PURGE } from "redux-persist"

export type Message = {
  count: number
  message: string
}

type Count = Message & {
  loading: boolean
  error: {
    status: boolean
    message: string | null
  }
}

const initialState: Count = {
  count: -2,
  message: "none",
  loading: false,
  error: {
    status: false,
    message: null,
  },
}

const sleep = (waitTime: number) =>
  new Promise((resolve) => setTimeout(resolve, waitTime))

export const twoAsyncCount = createAsyncThunk<Message, Message>(
  "twoAsyncCount",
  async (numWithMessage: Message) => {
    await sleep(3000)
    return numWithMessage
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
      (state, action: PayloadAction<Message>) => {
        state.loading = false
        state.count += action.payload.count
        state.message = action.payload.message
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
    builder.addCase(PURGE, () => {
      storage.removeItem("root")
    })
  },
})

// export const { additionTwo, subtractionTwo } = twoCounterSlice.actions
export default twoCounterSlice.reducer
