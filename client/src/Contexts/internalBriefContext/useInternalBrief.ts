import { useContext } from "react";
import { InternalBriefContext } from "./internalBriefContext";

export function useInternalBrief() {
  const ctx = useContext(InternalBriefContext);
  if (!ctx) throw new Error("useReview must be used within ReviewProvider");
}
