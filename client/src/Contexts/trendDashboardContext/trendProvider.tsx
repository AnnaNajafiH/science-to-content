// provides context + state logic to app

import React, { useReducer, useCallback, useEffect } from "react";
import { getTrends } from "../../services/trendService";
import { trendsReducer, initialTrendsState } from "./trendReducer";
import { TrendsContext } from "./trendContext";
import type { TrendsContextValue } from "./trendContext";
import type { TrendsState } from "./trendReducer";
import type { Trend } from "../../types";

export const TrendsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [state, dispatch] = useReducer(trendsReducer, initialTrendsState);

  const loadTrends = useCallback(async () => {
    dispatch({ type: "LOAD_START" });

    try {
      const data = await getTrends();
      dispatch({ type: "LOAD_SUCCESS", payload: data });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      dispatch({ type: "LOAD_FAILURE", payload: message });
    }
  }, []);

  const setFilter = useCallback(
    (f: TrendsState["filter"]) => dispatch({ type: "SET_FILTER", payload: f }),
    []
  );

  const selectTrend = useCallback((t: Trend | null) => {
    if (t) dispatch({ type: "SELECT_TREND", payload: t });
    else dispatch({ type: "CLEAR_SELECTED" });
  }, []);

  useEffect(() => {
    loadTrends();
  }, [loadTrends]);

  const value: TrendsContextValue = {
    state,
    loadTrends,
    setFilter,
    selectTrend,
  };

  return (
    <TrendsContext.Provider value={value}>
      {children}
    </TrendsContext.Provider>
  );
};
