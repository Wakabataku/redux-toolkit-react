import React from "react"
import { AppDispatch, useAppSelector } from "./store/store"
import { useDispatch } from "react-redux"
import { addition, subtraction } from "./store/counterSlice"
// このBoxは気にしなくていい
import { Box } from "@mui/material"

import { twoAsyncCount } from "./store/asyncCounterSlice"
import { persistor } from "./store/store"
import { arrayAddition } from "./store/arrayCounter"

const AsyncApp: React.FC = () => {
  const count = useAppSelector((state) => state.counter.countOne)
  const twoCount = useAppSelector((state) => state.twoCounter)
  const arrayCount = useAppSelector((state) => state.arrayCounter.arrayCount)
  const dispatch: AppDispatch = useDispatch()

  const onClickPurge = () => {
    console.log("localdataをpurge")
    persistor.purge()
  }

  return (
    <div className="App">
      <Box sx={{ m: 2 }}>
        <h1>Count: {count}</h1>
        <button onClick={() => dispatch(addition(1))}>Up</button>
        <button onClick={() => dispatch(subtraction(1))}>Down</button>
        <button onClick={() => onClickPurge()}>Purge</button>
      </Box>
      <Box sx={{ m: 3 }}>
        <h1>Async Count: {twoCount.count}</h1>
        <h1>Async Message: {twoCount.message}</h1>
        <button
          onClick={() =>
            dispatch(
              twoAsyncCount({
                count: 2,
                message: "2 Up!",
              })
            )
          }
        >
          Up
        </button>
        <button
          onClick={() =>
            dispatch(
              twoAsyncCount({
                count: -2,
                message: "2 Down!",
              })
            )
          }
        >
          Down
        </button>
        <button onClick={() => onClickPurge()}>Purge</button>
      </Box>
      <Box sx={{ m: 2 }}>
        <h1>ArrayCount: {arrayCount}</h1>
        <button onClick={() => dispatch(arrayAddition([1, 2, 3]))}>
          [1,2, 3]
        </button>
        <button onClick={() => dispatch(arrayAddition([1, 2]))}>[1,2]</button>
      </Box>
    </div>
  )
}

export default AsyncApp
