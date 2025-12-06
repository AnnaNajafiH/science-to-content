import {
  useReducer,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  initialReviewState,
  reviewReducer,
} from "./reviewReducer";
import type { ReviewState } from "./reviewReducer";
import type { GeneratedContent } from "../../types";
import { ReviewContext , type ReviewContextValue} from "./reviewContext";
import { contentService } from "../../services/contentService";

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reviewReducer, initialReviewState);

  const loadContents = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await contentService.getGeneratedContent();
      dispatch({ type: "SET_CONTENTS", payload: data });
    } catch (error) {
      console.error("Failed to load content:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);
  useEffect(() => {
    loadContents();
  }, [loadContents]);

  const handleApprove = useCallback(
    async (contentId: string) => {
      try {
        const approved = await contentService.approveContent(
          contentId,
          state.reviewNotes
        );

        // update modal content status to approved so user sees it immediately
        dispatch({
          type: "UPDATE_SELECTED_STATUS",
          payload: { status: "approved", approvedAt: approved.approvedAt },
        });
        dispatch({
          type: "SET_APPROVED_MESSAGE",
          payload: "Content Approved & Published",
        });
        dispatch({ type: "SET_SHOW_CONFETTI", payload: true });
        dispatch({ type: "SET_REVIEW_NOTES", payload: "" });

        // keep confetti visible briefly then refresh list and close modal
        setTimeout(async () => {
          dispatch({ type: "SET_SHOW_CONFETTI", payload: false });
          dispatch({ type: "SET_APPROVED_MESSAGE", payload: null });
          await loadContents();
          dispatch({ type: "CLEAR_SELECTED" });
        }, 1400);
      } catch (error) {
        console.error("Failed to approve content:", error);
      }
    },
    [loadContents, state.reviewNotes]
  );

  const handleReject = useCallback(
    async (contentId: string) => {
      try {
        await contentService.rejectContent(
          contentId,
          state.reviewNotes || "Rejected"
        );
        await loadContents();
        dispatch({ type: "CLEAR_SELECTED" });
        dispatch({ type: "SET_REVIEW_NOTES", payload: "" });
      } catch (error) {
        console.error("Failed to reject content:", error);
      }
    },
    [loadContents, state.reviewNotes]
  );

  const handleViewDetails = useCallback((content: GeneratedContent) => {
    dispatch({ type: "SET_SELECTED", payload: content });
  }, []);

  const setReviewNotes = useCallback((notes: string) => {
    dispatch({ type: "SET_REVIEW_NOTES", payload: notes });
  }, []);

  const setFilter = useCallback((filter: ReviewState["filter"]) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  }, []);

  const clearSelected = useCallback(() => {
    dispatch({ type: "CLEAR_SELECTED" });
  }, []);

  const filteredContents = useMemo(
    () =>
      state.contents.filter(
        (content) => state.filter === "all" || content.status === state.filter
      ),
    [state.contents, state.filter]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  const value: ReviewContextValue = {
    state: { ...state, contents: filteredContents },
    loadContents,
    handleApprove,
    handleReject,
    handleViewDetails,
    getStatusColor,
    setReviewNotes,
    setFilter,
    clearSelected,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
}
