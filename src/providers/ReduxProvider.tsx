// src/providers/ReduxProvider.tsx
"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { Store } from "@reduxjs/toolkit";

interface ReduxProviderProps {
  store: Store;
  children: ReactNode;
}

export default function ReduxProvider({ store, children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
