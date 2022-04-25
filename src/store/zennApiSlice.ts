import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosResponse } from "axios"
import { ZennTrendItem } from "../type/zennTrend"

const base = "https://zenn-api.netlify.app/.netlify/functions"

type State = {
  trends: Array<ZennTrendItem>
  loading: boolean
  error: {
    status: boolean
    message: string | null
  }
}

const initialState: State = {
  trends: [],
  loading: false,
  error: {
    status: false,
    message: null,
  },
}

export const fetchZennTrend = createAsyncThunk(
  "zennApi/fetchZennTrend",
  async () => {
    const result: AxiosResponse<Array<ZennTrendItem>> = await axios.get(
      `${base}/trendTech`
    )
    return result.data
  }
)

export const zennApiSlice = createSlice({
  name: "zennApi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchZennTrend.pending, (state, action) => {
      state.loading = true
      state.error.status = false
      state.error.message = null
    })
    builder.addCase(fetchZennTrend.fulfilled, (state, action) => {
      state.loading = false
      state.trends = new Array(...action.payload)
    })
    builder.addCase(fetchZennTrend.rejected, (state, action) => {
      state.loading = true
      state.error.status = true
      state.error.message = "cannot fetched data from zenn api(unofficial)"
    })
  },
})

export default zennApiSlice.reducer
