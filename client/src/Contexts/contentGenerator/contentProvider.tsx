import React, { useReducer, useCallback, useEffect } from "react";
import { contentService } from "../../services/contentService";
import { reducer, initialState } from "./contentReducer";
import { ContentGeneratorContext } from "./contentContext";
import type { contentContextValue } from "./contentContext";

export const ContentGeneratorProvider: React.FC<{children: React.ReactNode;}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async function load() {
      try {
        const t = await contentService.getTrends();
        dispatch({ type: "SET_TRENDS", trends: t });
        if (t.length > 0) dispatch({ type: "SELECT_TREND", id: t[0].id });
      } catch (err) {
        console.error("Failed to load trends", err);
      }
    })();
  }, []);

  const selectTrend = useCallback(
    (id: string) => dispatch({ type: "SELECT_TREND", id }),
    []
  );
  const setContentType = useCallback(
    (id: string) => dispatch({ type: "SET_CONTENT_TYPE", id }),
    []
  );

  const generate = async () => {
    if (!state.selectedTrendId) return;
    dispatch({ type: "START_GENERATE" });
    try {
      const content = await contentService.generateContent(
        state.selectedTrendId,
        state.contentType
      );
      dispatch({ type: "SET_GENERATED", content });
      dispatch({ type: "SET_CONFETTI", show: true });
      setTimeout(() => dispatch({ type: "SET_CONFETTI", show: false }), 2000);
    } catch (err) {
      console.error("Generation failed", err);
      dispatch({ type: "FINISH_GENERATE" });
    }
  };

  const openPreview = () => dispatch({ type: "SET_PREVIEW", show: true });
  const closePreview = () => dispatch({ type: "SET_PREVIEW", show: false });

  const notifySendSuccess = (id: string) => {
    dispatch({ type: "SEND_SUCCESS", id });
    dispatch({ type: "SET_CONFETTI", show: true });
    setTimeout(() => dispatch({ type: "SET_CONFETTI", show: false }), 1600);
  };

  const value: contentContextValue = {
    state,
    selectTrend,
    setContentType,
    generate,
    openPreview,
    closePreview,
    notifySendSuccess,
  };

  return (
    <ContentGeneratorContext.Provider value={value}>
      {children}
    </ContentGeneratorContext.Provider>
  );
};
