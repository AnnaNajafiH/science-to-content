// reducer + initial state + types

import type { Trend } from "../../types";

export type TrendsState = {
  trends: Trend[];
  loading: boolean;
  filter: "all" | "hot" | "rising";
  selectedTrend: Trend | null;
  error?: string | null;
};

export type TrendsAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Trend[] }
  | { type: "LOAD_FAILURE"; payload: string }
  | { type: "SET_FILTER"; payload: TrendsState["filter"] }
  | { type: "SELECT_TREND"; payload: Trend }
  | { type: "CLEAR_SELECTED" };

export const initialTrendsState: TrendsState = {
  trends: [],
  loading: false,
  filter: "all",
  selectedTrend: null,
  error: null,
};

export function trendsReducer(
  state: TrendsState,
  action: TrendsAction
): TrendsState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };

    case "LOAD_SUCCESS":
      return { ...state, loading: false, trends: action.payload };

    case "LOAD_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SELECT_TREND":
      return { ...state, selectedTrend: action.payload };

    case "CLEAR_SELECTED":
      return { ...state, selectedTrend: null };

    default:
      return state;
  }
}
