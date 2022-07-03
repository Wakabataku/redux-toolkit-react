import React, { useEffect, useCallback } from "react"
import { AppDispatch, useAppSelector, zennTrendSelector } from "./store/store"
import { useDispatch } from "react-redux"
import { fetchZennTrend } from "./store/zennApiSlice"
import { Box, Grid } from "@mui/material"
import { addition, subtraction } from "./store/counterSlice"

import ZennTrendCard from "./ZennTrendCard"
import { twoAsyncCount } from "./store/twoCounterSlice"
import { persistor } from "./index"
import { useGetPokemonByNameQuery } from "./store/pokemon"

const AsyncApp: React.FC = () => {
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur")
  const count = useAppSelector((state) => state.counter.count)
  const twoCount = useAppSelector((state) => state.twoCounter.count)
  const dispatch: AppDispatch = useDispatch()
  // const trends = useAppSelector(zennTrendSelector)
  // const fetchTrends = useCallback(() => {
  //   dispatch(fetchZennTrend)
  // }, [dispatch])

  // useEffect(() => {
  //   if (trends.length === 0) return fetchTrends()
  //   return
  // }, [fetchTrends, trends])

  const handleBeforeUnloadEvent = (event: BeforeUnloadEvent) => {
    console.log("ページ離れた")
    persistor.purge()
  }
  useEffect(() => {
    console.log(data)
    // window.addEventListener("beforeunload", handleBeforeUnloadEvent)
    // return () =>
    //   window.removeEventListener("beforeunload", handleBeforeUnloadEvent)
  }, [])

  return (
    // <div className="App">
    //   <Box sx={{ m: 2 }}>
    //     <h1>Count: {count}</h1>
    //     <button onClick={() => dispatch(addition(1))}>Up</button>
    //     <button onClick={() => dispatch(subtraction(1))}>Down</button>
    //     <button onClick={() => persistor.purge()}>Purge</button>
    //   </Box>
    //   <Box sx={{ m: 3 }}>
    //     <h1>Count: {twoCount}</h1>
    //     <button onClick={() => dispatch(twoAsyncCount(2))}>Up</button>
    //     <button onClick={() => dispatch(twoAsyncCount(-2))}>Down</button>
    //     <button onClick={() => persistor.purge()}>Purge</button>
    //   </Box>
    // </div>
    <div className="App">
      {error ? (
        <h1>エラー</h1>
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <>
          <h1>{data.species.name}</h1>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  )
}

export default AsyncApp
