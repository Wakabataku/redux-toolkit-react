import React, { useEffect } from "react"
import { AppDispatch, useAppSelector } from "./store/store"
import { useDispatch } from "react-redux"
import { Box } from "@mui/material"
import { addition, subtraction } from "./store/counterSlice"

import { twoAsyncCount } from "./store/twoCounterSlice"
import { persistor } from "./index"

const AsyncApp: React.FC = () => {
  const count = useAppSelector((state) => state.counter.count)
  const twoCount = useAppSelector((state) => state.twoCounter)
  const dispatch: AppDispatch = useDispatch()

  const handleBeforeUnloadEvent = (event: BeforeUnloadEvent) => {
    console.log("ページ離れた")
    persistor.purge()
  }
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnloadEvent)
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnloadEvent)
  }, [])

  return (
    <div className="App">
      <Box sx={{ m: 2 }}>
        <h1>Count: {count}</h1>
        <button onClick={() => dispatch(addition(1))}>Up</button>
        <button onClick={() => dispatch(subtraction(1))}>Down</button>
        <button onClick={() => persistor.purge()}>Purge</button>
      </Box>
      <Box sx={{ m: 3 }}>
        <h1>Count: {twoCount.count}</h1>
        <h1>Message: {twoCount.message}</h1>
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
        <button onClick={() => persistor.purge()}>Purge</button>
      </Box>
    </div>
  )
}

export default AsyncApp
