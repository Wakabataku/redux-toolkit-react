import React from "react"
import "./App.css"

import { useAppSelector, useAppDispatch } from "./store/store"
import { addition, subtraction } from "./store/counterSlice"

const App: React.FC = (): JSX.Element => {
  const count = useAppSelector((state) => state.counter.count)
  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(addition(1))}>Up</button>
      <button onClick={() => dispatch(subtraction(1))}>Down</button>
    </div>
  )
}

export default App
