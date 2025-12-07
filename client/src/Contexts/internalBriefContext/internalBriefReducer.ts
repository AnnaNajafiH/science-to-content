import type { InternalBrief, RDDocument } from "../../types";

export type InternalBriefState = {
  rdDocuments: RDDocument[];
  selectedDoc: string;
  targetAudience: string;
  generating: boolean;
  generatedBrief: InternalBrief | null;
  briefs: InternalBrief[];
  emailModalOpen: boolean;
  emailRecipients: string;
  emailSending: boolean;
  emailSentAck: string | null;
  shareMenuOpen: boolean;
};

export type InternalBriefAction =
  | { type: "setRdDocuments"; payload: RDDocument[] }
  | { type: "setSelectedDoc"; payload: string }
  | { type: "setTargetAudience"; payload: string }
  | { type: "setGenerating"; payload: boolean }
  | { type: "setGeneratedBrief"; payload: InternalBrief | null }
  | { type: "setBriefs"; payload: InternalBrief[] }
  | { type: "setEmailModalOpen"; payload: boolean }
  | { type: "setEmailModalClose"; payload: boolean }
  | { type: "setEmailRecipients"; payload: string }
  | { type: "setEmailSending"; payload: boolean }
  | { type: "setEmailSentAck"; payload: string | null }
  | { type: "setShareMenuOpen"; payload: boolean };

export const initialInternalBriefState: InternalBriefState = {
  rdDocuments: [],
  selectedDoc: "",
  targetAudience: "Marketing & Communications Teams",
  generating: false,
  generatedBrief: null,
  briefs: [],
  emailModalOpen: false,
  emailRecipients: "",
  emailSending: false,
  emailSentAck: null,
  shareMenuOpen: false,
};

export function internalBriefReducer(
  state: InternalBriefState,
  action: InternalBriefAction
): InternalBriefState {
  switch (action.type) {
    case "setRdDocuments":
      return { ...state, rdDocuments: action.payload };
    case "setSelectedDoc":
      return { ...state, selectedDoc: action.payload };
    case "setTargetAudience":
      return { ...state, targetAudience: action.payload };
    case "setGenerating":
      return { ...state, generating: action.payload };
    case "setGeneratedBrief":
      return { ...state, generatedBrief: action.payload };
    case "setBriefs":
      return { ...state, briefs: action.payload };
    case "setEmailModalOpen":
      return { ...state, emailModalOpen: action.payload };
    case "setEmailRecipients":
      return { ...state, emailRecipients: action.payload };
    case "setEmailSending":
      return { ...state, emailSending: action.payload };
    case "setEmailSentAck":
      return { ...state, emailSentAck: action.payload };
    case "setShareMenuOpen":
      return { ...state, shareMenuOpen: action.payload };
    default:
      return state;
  }
}
