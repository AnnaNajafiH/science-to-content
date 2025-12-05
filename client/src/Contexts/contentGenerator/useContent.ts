import { useContext } from "react";
import { ContentGeneratorContext } from "./contentContext";

export function useContent() {
  const ctx = useContext(ContentGeneratorContext);
  if (!ctx) throw new Error("useContent must be used within ContentGeneratorProvider");
  return ctx;
}
