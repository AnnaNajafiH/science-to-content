import type{ Trend, GeneratedContent } from "../../types/index";

export type contentState = {
  trends: Trend[];
  selectedTrendId?: string;
  contentType: string;
  generating: boolean;
  generatedContent?: GeneratedContent | null;
  showPreview: boolean;
  sendSuccess?: string | null;
  showConfetti: boolean;
};

export type contentAction =
  | { type: "SET_TRENDS"; trends: Trend[] }
  | { type: "SELECT_TREND"; id: string }
  | { type: "SET_CONTENT_TYPE"; id: string }
  | { type: "START_GENERATE" }
  | { type: "SET_GENERATED"; content: GeneratedContent }
  | { type: "FINISH_GENERATE" }
  | { type: "SET_PREVIEW"; show: boolean }
  | { type: "SEND_SUCCESS"; id: string }
  | { type: "SET_CONFETTI"; show: boolean };


export const initialState: contentState = {
  trends: [],
  selectedTrendId: undefined,
  contentType: "instagram-carousel",
  generating: false,
  generatedContent: null,
  showPreview: false,
  sendSuccess: null,
  showConfetti: false,
};

export function reducer(state: contentState, action: contentAction): contentState {
  switch (action.type) {
    case "SET_TRENDS":
      return { ...state, trends: action.trends };
    case "SELECT_TREND":
      return { ...state, selectedTrendId: action.id };
    case "SET_CONTENT_TYPE":
      return { ...state, contentType: action.id };
    case "START_GENERATE":
      return { ...state, generating: true, generatedContent: null };
    case "SET_GENERATED":
      return { ...state, generatedContent: action.content, generating: false };
    case "FINISH_GENERATE":
      return { ...state, generating: false };
    case "SET_PREVIEW":
      return { ...state, showPreview: action.show };
    case "SEND_SUCCESS":
      return { ...state, sendSuccess: action.id };
    case "SET_CONFETTI":
      return { ...state, showConfetti: action.show };
    default:
      return state;
  }
}





