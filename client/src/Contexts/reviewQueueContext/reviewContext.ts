import { createContext } from "react";
import type { ReviewState } from "./reviewReducer";
import type { GeneratedContent } from "../../types";

export type ReviewContextValue = {
  state: ReviewState;
  loadContents: () => Promise<void>;
  // Actions exposed by the provider
  handleApprove: (contentId: string) => Promise<void>;
  handleReject: (contentId: string) => Promise<void>;
  handleViewDetails: (content: GeneratedContent) => void;
  // UI helpers
  getStatusColor: (status: string) => string;
  // setters for UI to update note/filter
  setReviewNotes: (notes: string) => void;
  setFilter: (filter: ReviewState["filter"]) => void;
  // clear the currently selected content (close modal)
  clearSelected: () => void;
};

export const ReviewContext = createContext<ReviewContextValue | undefined>(
  undefined
);
