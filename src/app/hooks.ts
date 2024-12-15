import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useSelector } from "react-redux";

export const userAppDispatch: ()  => AppDispatch = useDispatch
export const userAppSelector: TypedUseSelectorHook<RootState> = useSelector