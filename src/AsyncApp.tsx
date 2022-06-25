import React, { useEffect, useCallback } from "react"
import { AppDispatch, useAppSelector, zennTrendSelector } from "./store/store"
import { useDispatch } from "react-redux"
import { fetchZennTrend } from "./store/zennApiSlice"
import { Box, Grid } from "@mui/material"
import { addition, subtraction } from "./store/counterSlice"

import ZennTrendCard from "./ZennTrendCard"
import { persistor } from "./index"
import { additionTwo, subtractionTwo } from "./store/twoCounterSlice"

const AsyncApp: React.FC = () => {
  const count = useAppSelector((state) => state.counter.count)
  const twoCount = useAppSelector((state) => state.twoCounter.count)
  const dispatch: AppDispatch = useDispatch()
  const trends = useAppSelector(zennTrendSelector)
  const fetchTrends = useCallback(() => {
    dispatch(fetchZennTrend)
  }, [dispatch])

  useEffect(() => {
    if (trends.length === 0) return fetchTrends()
    return
  }, [fetchTrends, trends])

  return (
    <div className="App">
      <Box sx={{ m: 2 }}>
        <h1>Count: {count}</h1>
        <button onClick={() => dispatch(addition(1))}>Up</button>
        <button onClick={() => dispatch(subtraction(1))}>Down</button>
        <button onClick={() => persistor.purge()}>Purge</button>
      </Box>
      <Box sx={{ m: 3 }}>
        <h1>Count: {twoCount}</h1>
        <button onClick={() => dispatch(additionTwo(2))}>Up</button>
        <button onClick={() => dispatch(subtractionTwo(2))}>Down</button>
        <button onClick={() => persistor.purge()}>Purge</button>
      </Box>
    </div>
  )
}

export default AsyncApp
