import { useContext } from "react";
import { InternalBriefContext } from "./internalBriefContext";

export function useInternalBrief() {
  const ctx = useContext(InternalBriefContext);
  if (!ctx) throw new Error("useInternalBrief must be used within InternalBriefProvider");
  return ctx;
}
