import { useCallback, useEffect, useReducer } from "react";
import { initialInternalBriefState, internalBriefReducer } from "./InternalBriefReducer";
import{InternalBriefContext, type InternalBriefContextValue} from "./internalBriefContext";
import { contentService } from "../../services/contentService";

export const InternalBriefProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
    const [state, dispatch] = useReducer(internalBriefReducer, initialInternalBriefState);

    const loadRDDocuments = useCallback(async () => {
      try {
        const docs = await contentService.getRDDocuments();
        dispatch({ type: "setRdDocuments", payload: docs });
        if (docs.length > 0)
          dispatch({ type: "setSelectedDoc", payload: docs[0].id });
      } catch (error) {
        console.error("Failed to load RD Documents", error);
      }
    }, []);


    const loadBriefs = useCallback(async() => {
        try{
            const data = await contentService.getInternalBriefs();
            dispatch({type:"setBriefs", payload: data});
        } catch (error) {
            console.error("Failed to load Internal Briefs", error);
        }
    }, []);

    useEffect(() => {
      loadRDDocuments();
      loadBriefs();
    }, [loadRDDocuments, loadBriefs]);


  const generateBrief = useCallback(async() => {
    if(!state.selectedDoc) return;
    dispatch({type:"setGenerating", payload: true});
    dispatch({type:"setGeneratedBrief", payload: null});
    try{
        const brief = await contentService.generateInternalBrief(state.selectedDoc, state.targetAudience);
        dispatch({type:"setGeneratedBrief", payload: brief});
    } catch (error) {
        console.error("Failed to generate Internal Brief", error);
    } finally {
        dispatch({type:"setGenerating", payload: false});
    }
    }, [state.selectedDoc, state.targetAudience]);


    const openEmailModal = useCallback(() => {
        dispatch({type:"setEmailRecipients", payload: ""});
        dispatch({type:"setEmailSentAck", payload: null});
        dispatch({type:"setEmailModalOpen", payload: true});
    }, []);

    const closeEmailModal = useCallback(() => {
        dispatch({type:"setEmailModalOpen", payload: false});
    }, []);

     const exportBrief = useCallback(() => {
        if(!state.generatedBrief) return;
        // generateBriefPDF(state.generatedBrief);
    }, [state.generatedBrief]);

    const sendEmail = useCallback(async() => {
        if(!state.generatedBrief) return;
        const recipients = state.emailRecipients.split(/[;,\n]/).map(s => s.trim()).filter(Boolean);
        
        if (recipients.length === 0) {
            dispatch({type:"setEmailSentAck", payload: "Please provide at least one email recipient."});
            return;
        }   

        dispatch({type:"setEmailSending", payload: true});
        dispatch({type:"setEmailSentAck", payload: null});
        try{
            await contentService.sendBriefByEmail(state.generatedBrief.id, recipients);
            dispatch({type:"setEmailSentAck", payload: "Brief sent successfully!"});
            setTimeout(() => dispatch({type:"setEmailModalOpen", payload: false}), 900);
        } catch (error) {
            console.error("Failed to send email", error);
            dispatch({type:"setEmailSentAck", payload: "Failed to send email. Please try again."});
        } finally {
            dispatch({type:"setEmailSending", payload: false});
        }
    }, [state.generatedBrief, state.emailRecipients]);

    const toggleShareMenu = useCallback(() => {
        dispatch({type:"setShareMenuOpen", payload: !state.shareMenuOpen});
    }, [state.shareMenuOpen]);

    const setSelectedDocCb = useCallback((id: string) => {
        dispatch({type:"setSelectedDoc", payload: id});
    }, []);

    const setTargetAudienceCb = useCallback((s: string) => {
        dispatch({type:"setTargetAudience", payload: s});
    }, []); 

    const setEmailRecipientsCb = useCallback((s: string) => {
        dispatch({type:"setEmailRecipients", payload: s});
    }, []);

    const value: InternalBriefContextValue = {
        ...state,
        loadRDDocuments,
        loadBriefs,
        generateBrief,
        openEmailModal,
        closeEmailModal,
        exportBrief,
        sendEmail,
        toggleShareMenu,
        setSelectedDoc: setSelectedDocCb,
        setTargetAudience: setTargetAudienceCb,
        setEmailRecipients: setEmailRecipientsCb,
    };
    return (
        <InternalBriefContext.Provider value={value}>
            {children}
        </InternalBriefContext.Provider>
    );
}



