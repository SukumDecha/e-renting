import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

export interface SiderState {
  collapsed: boolean;
  setCollapsed: (collapsed: SiderState["collapsed"]) => void;
}

export const useSiderStore = create<SiderState>()(
  immer(
    devtools((set) => {
      return {
        collapsed: true,
        setCollapsed(collapsed) {
          set((state) => {
            state.collapsed = collapsed;
          });
        },
      };
    })
  )
);
