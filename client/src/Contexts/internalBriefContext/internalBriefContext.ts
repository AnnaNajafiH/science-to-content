import { createContext } from "react";
import type { InternalBriefState } from "./internalBriefReducer";

export type InternalBriefContextValue = InternalBriefState & {
  loadRDDocuments: () => Promise<void>;
  loadBriefs: () => Promise<void>;
  generateBrief: () => Promise<void>;
  openEmailModal: () => void;
  closeEmailModal: () => void;
  exportBrief: () => void;
  sendEmail: () => Promise<void>;
  toggleShareMenu: () => void;
  setSelectedDoc: (id: string) => void;
  setTargetAudience: (s: string) => void;
  setEmailRecipients: (s: string) => void;
  showConfetti: boolean;
  setConfettiVisible: (v: boolean) => void;
};

export const InternalBriefContext = createContext<InternalBriefContextValue | undefined>(undefined);
