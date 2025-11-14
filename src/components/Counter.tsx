"use client";

import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, decrement, increment, RootState } from "../lib/store";
// import { RootState, AppDispatch, increment, decrement } from "@/lib/store";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
