import { useContext } from "react";
import { ContentGeneratorContext } from "./contentContext";

export function useContentGenerator() {
  const ctx = useContext(ContentGeneratorContext);
  if (!ctx) throw new Error("useContent must be used within ContentGeneratorProvider");
  return ctx;
}
