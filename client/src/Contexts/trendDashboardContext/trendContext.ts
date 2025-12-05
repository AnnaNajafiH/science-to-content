// createContext only

import { createContext } from "react";
import type { TrendsState } from "./trendReducer";
import type { Trend } from "../../types";

export type TrendsContextValue = {
  state: TrendsState;
  loadTrends: () => Promise<void>;
  setFilter: (f: TrendsState["filter"]) => void;
  selectTrend: (t: Trend | null) => void;
};

export const TrendsContext = createContext<TrendsContextValue | undefined>(
  undefined
);
