import type { StateCreator } from "zustand"

import type { AppSlice } from "./slices/app"

export type Store = AppSlice &
  {
    resetAllSlices: () => void
  }
export type StateSlice<T> = StateCreator<Store, [["zustand/immer", never], ["zustand/persist", unknown]], [], T>
