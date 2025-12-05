// custom hook to consume context

import { useContext } from "react";
import { TrendsContext } from "./trendContext";

export function useTrends() {
  const ctx = useContext(TrendsContext);
  if (!ctx) throw new Error("useTrends must be used within TrendsProvider");
  return ctx;
}
