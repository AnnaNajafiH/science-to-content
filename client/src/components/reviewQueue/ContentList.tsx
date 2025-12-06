import { Clock, Eye, Shield } from "lucide-react";
import { useReview } from "../../Contexts/reviewQueueContext/useReview";
import type { GeneratedContent } from "../../types";
import { useMemo } from "react";

const ContentList: React.FC = () => {
  const { state, handleViewDetails, getStatusColor } = useReview();

  const filteredContents = useMemo(
    () =>
      state.contents.filter(
        (content) => state.filter === "all" || content.status === state.filter
      ),
    [state.contents, state.filter]
  );

  return (
    <div>
      {filteredContents.map((content: GeneratedContent) => (
        <div
          key={content.id}
          className={`rounded-xl shadow-sm p-4 lg:p-6 border-2 hover:shadow-md transition ${
            content.status === "rejected"
              ? "bg-red-50 border-red-300 opacity-75"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4 gap-3">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-2">
                <span
                  className={`px-2 lg:px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(
                    content.status
                  )} ${content.status === "rejected" ? "animate-pulse" : ""}`}
                >
                  {content.status === "rejected"
                    ? "❌ REJECTED"
                    : content.status.toUpperCase()}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 capitalize">
                  {content.type.replace("-", " ")}
                </span>
                <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">
                    {new Date(content.generatedAt).toLocaleString()}
                  </span>
                  <span className="sm:hidden">
                    {new Date(content.generatedAt).toLocaleDateString()}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Shield
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    content.status === "rejected"
                      ? "text-red-500"
                      : content.confidence > 0.8
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                />
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    content.status === "rejected" ? "text-red-700" : ""
                  }`}
                >
                  Confidence: {Math.round(content.confidence * 100)}%
                </span>
              </div>
            </div>
            <button
              onClick={() => handleViewDetails(content)}
              className={`px-3 sm:px-4 py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap ${
                content.status === "rejected"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-beiersdorf-blue text-white hover:bg-beiersdorf-navy"
              }`}
            >
              <Eye className="w-4 h-4" />
              {content.status === "rejected" ? "View Rejection" : "Review"}
            </button>
          </div>

          {content.caption && (
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-3">
              <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">
                {content.caption}
              </p>
            </div>
          )}

          {content.slides && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {content.slides.slice(0, 3).map((slide) => (
                <div
                  key={slide.number}
                  className={`flex-shrink-0 w-32 sm:w-40 rounded-lg p-2 sm:p-3 border ${
                    content.status === "rejected"
                      ? "bg-red-100 border-red-300"
                      : "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200"
                  }`}
                >
                  <div
                    className={`text-xs font-bold mb-1 ${
                      content.status === "rejected"
                        ? "text-red-700"
                        : "text-purple-600"
                    }`}
                  >
                    Slide {slide.number}
                  </div>
                  <p className="text-xs text-gray-700 line-clamp-2">
                    {slide.text}
                  </p>
                </div>
              ))}
              {content.slides.length > 3 && (
                <div className="flex-shrink-0 w-32 sm:w-40 bg-gray-100 rounded-lg p-2 sm:p-3 flex items-center justify-center">
                  <span className="text-xs sm:text-sm text-gray-500">
                    +{content.slides.length - 3} more
                  </span>
                </div>
              )}
            </div>
          )}

          {content.status === "rejected" && content.reviewerNotes && (
            <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-xs font-semibold text-red-900 mb-1">
                Rejection Reason:
              </p>
              <p className="text-xs text-red-800 line-clamp-2">
                {content.reviewerNotes}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {content.hashtags?.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className={`text-xs px-2 py-1 rounded-full ${
                  content.status === "rejected"
                    ? "bg-red-100 text-red-700 line-through"
                    : "bg-beiersdorf-light text-beiersdorf-blue"
                }`}
              >
                #{tag.replace(/\\s+/g, "")}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
