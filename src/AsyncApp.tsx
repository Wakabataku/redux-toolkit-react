import React, { useEffect, useCallback } from "react"
import { AppDispatch, useAppSelector, zennTrendSelector } from "./store/store"
import { useDispatch } from "react-redux"
import { fetchZennTrend } from "./store/zennApiSlice"
import { Box, Grid } from "@mui/material"
import { addition, subtraction } from "./store/counterSlice"

import ZennTrendCard from "./ZennTrendCard"

const AsyncApp: React.FC = () => {
  const count = useAppSelector((state) => state.counter.count)
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
        {trends.length == 0 ? (
          <></>
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ display: "flex" }}
            spacing={2}
          >
            {trends.map((item) => {
              return <ZennTrendCard item={item} key={item.id} />
            })}
          </Grid>
        )}
      </Box>
    </div>
  )
}

export default AsyncApp
