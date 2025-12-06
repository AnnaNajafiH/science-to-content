import type { GeneratedContent } from "../../types";


  export type ReviewState = {
    contents: GeneratedContent[];
    loading: boolean;
    selectedContent: GeneratedContent | null;
    reviewNotes: string;
    showConfetti: boolean;
    approvedMessage: string | null;
    filter: "all" | "pending" | "approved" | "rejected";
  };

  export type ReviewAction =
    | { type: "SET_CONTENTS"; payload: GeneratedContent[] }
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_SELECTED"; payload: GeneratedContent | null }
    | { type: "SET_REVIEW_NOTES"; payload: string }
    | { type: "SET_SHOW_CONFETTI"; payload: boolean }
    | { type: "SET_APPROVED_MESSAGE"; payload: string | null }
    | { type: "SET_FILTER"; payload: ReviewState["filter"] }
    | { type: "UPDATE_SELECTED_STATUS"; payload: Partial<GeneratedContent> }
    | { type: "CLEAR_SELECTED" };

export const initialReviewState: ReviewState = {
    contents: [],
    loading: false,
    selectedContent: null,
    reviewNotes: "",
    showConfetti: false,
    approvedMessage: null,
    filter: "pending",
};



export function reviewReducer(
  state: ReviewState,
  action: ReviewAction
): ReviewState {
  switch (action.type) {
    case "SET_CONTENTS":
      return { ...state, contents: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_SELECTED":
      return { ...state, selectedContent: action.payload };
    case "SET_REVIEW_NOTES":
      return { ...state, reviewNotes: action.payload };
    case "SET_SHOW_CONFETTI":
      return { ...state, showConfetti: action.payload };
    case "SET_APPROVED_MESSAGE":
      return { ...state, approvedMessage: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "UPDATE_SELECTED_STATUS":
      return {
        ...state,
        selectedContent: state.selectedContent
          ? { ...state.selectedContent, ...action.payload }
          : state.selectedContent,
      };
    case "CLEAR_SELECTED":
      return { ...state, selectedContent: null };
    default:
      return state;
  }
}
