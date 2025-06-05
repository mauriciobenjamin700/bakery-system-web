import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

// Use em vez de useDispatch para ter tipagem
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Use em vez de useSelector para ter tipagem
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;