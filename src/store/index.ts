import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import localGameReducer from "$slices/localGameSlice";
import aiGameReducer from "$slices/aiGameSlice";

const store = configureStore({
  reducer: {
    localGame: localGameReducer,
    aiGame: aiGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
