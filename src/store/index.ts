import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

import { STORAGE_KEY } from "@/constants/storage-key"
import { createAppSlice } from "./slices/app"
import { Store } from "./types"

export const useStore = create<Store>()(
  immer(
    persist(
      (...args) => {
        const [set, , store] = args
        return {
          ...createAppSlice(...args),
          resetAllSlices: () => set(store.getInitialState(), true),
        }
      },
      {
        name: STORAGE_KEY.ZUSTAND_STORE,
      },
    ),
  ),
)
