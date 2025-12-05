import { createContext } from "react";
import type { contentState } from "./contentReducer";

export type contentContextValue = {
  state: contentState;
  selectTrend: (id: string) => void;
  setContentType: (id: string) => void;
  generate: () => Promise<void>;
  openPreview: () => void;
  closePreview: () => void;
  notifySendSuccess: (id: string) => void;
};

export const ContentGeneratorContext = createContext<contentContextValue | undefined>(
  undefined
);
