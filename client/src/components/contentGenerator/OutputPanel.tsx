import { CheckCircle, Eye, Loader2 } from "lucide-react";
import type { GeneratedContent } from "../../types";
import { contentService } from "../../services/contentService";
import { useState } from "react";

type Props = {
  generatedContent: GeneratedContent | null;
  generating: boolean;
  onPreview: () => void;
  onSendSuccess?: (id: string) => void;
};

export default function OutputPanel({
  generatedContent,
  generating,
  onPreview,
  onSendSuccess,
}: Props) {
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  const handleSend = async () => {
    if (!generatedContent) return;
    setSending(true);
    setSendSuccess(null);
    try {
      const submitted = await contentService.submitForReview(generatedContent);
      setSendSuccess(submitted.id);
      if (onSendSuccess) onSendSuccess(submitted.id);
    } catch (err) {
      console.error("Failed to send to review:", err);
      setSendSuccess(null);
    } finally {
      setSending(false);
    }
  };

  if (!generatedContent && !generating) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
        <Eye className="w-16 h-16 mb-4 opacity-20" />
        <p>Select a trend and content type, then click Generate</p>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="w-12 h-12 animate-spin text-beiersdorf-blue mb-4" />
        <p className="text-gray-600">AI is crafting your content...</p>
        <p className="text-sm text-gray-500 mt-2">
          This may take a few seconds
        </p>
      </div>
    );
  }

  return (
    generatedContent && (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="md:text-lg font-bold text-gray-900">
            Generated Content
          </h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm">
            <CheckCircle className="w-4 h-4" />
            {Math.round(generatedContent.confidence * 100)}% Confidence
          </div>
        </div>

        {generatedContent.slides && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Carousel Slides
            </h4>
            <div className="space-y-3">
              {generatedContent.slides.map((slide) => (
                <div
                  key={slide.number}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200"
                >
                  <div className="text-xs font-bold text-purple-600 mb-2">
                    SLIDE {slide.number}
                  </div>
                  <p className="text-gray-900 font-medium mb-2">{slide.text}</p>
                  <p className="text-sm text-gray-600 italic">
                    💡 {slide.visualHint}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {generatedContent.caption && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Caption</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">{generatedContent.caption}</p>
            </div>
          </div>
        )}

        {generatedContent.hashtags && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Hashtags</h4>
            <div className="flex flex-wrap gap-2">
              {generatedContent.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-full text-sm"
                >
                  #{tag.replace(/\s+/g, "")}
                </span>
              ))}
            </div>
          </div>
        )}

        {generatedContent.script && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Video Script</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-900 whitespace-pre-wrap font-sans">
                {generatedContent.script}
              </pre>
            </div>
          </div>
        )}

        {generatedContent.visualSuggestions && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Visual Suggestions
            </h4>
            <ul className="space-y-2">
              {generatedContent.visualSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="text-purple-600">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-3">
            📚 R&D References: {generatedContent.rdReferences.join(", ")}
          </p>
          <div className="flex flex-col lg:flex-row gap-3">
            <button
              onClick={onPreview}
              className="flex-1 py-3 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition font-medium flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview as Instagram Post
            </button>
            <button
              onClick={handleSend}
              disabled={sending || !generatedContent}
              className="flex-1 py-3 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition font-medium disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />{" "}
                  Sending...
                </>
              ) : (
                "Send to Review Queue"
              )}
            </button>
          </div>
          {sendSuccess && (
            <div className="mt-3 text-sm text-green-600 font-medium">
              Sent to review (id: {sendSuccess})
            </div>
          )}
        </div>
      </div>
    )
  );
}
