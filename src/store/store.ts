import { configureStore, createSelector } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import logger from "redux-logger"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

import counterReducer from "./counterSlice"
import zennApiReducer from "./zennApiSlice"

// 永続化の設定
const persistConfig = {
  key: "root",
  storage,
}
const persistedReducer = persistReducer(persistConfig, counterReducer)

export const store = configureStore({
  reducer: {
    zennApi: zennApiReducer,
    counter: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const zennApiSelector = (state: RootState) => state.zennApi
export const zennTrendSelector = createSelector(zennApiSelector, (zenn) => {
  return zenn.trends
})
