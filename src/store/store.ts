import { configureStore, createSelector } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import logger from "redux-logger"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"

import counterReducer from "./counterSlice"
import zennApiReducer from "./zennApiSlice"

const rootReducer = combineReducers({
  zennApi: zennApiReducer,
  counter: counterReducer,
})
// 永続化の設定
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["counter"],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const zennApiSelector = (state: RootState) => state.zennApi
export const zennTrendSelector = createSelector(zennApiSelector, (zenn) => {
  return zenn.trends
})
