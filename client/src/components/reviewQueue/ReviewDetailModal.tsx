import { CheckCircle, Edit3, XCircle } from "lucide-react";
import { useReview } from "../../Contexts/reviewQueueContext/useReview";

const ReviewDetailModal: React.FC = () => {
  const {
    state,
    handleApprove,
    handleReject,
    setReviewNotes,
    getStatusColor,
    clearSelected,
  } = useReview();

  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
        onClick={() => clearSelected()}
      >
        <div
          className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 my-2 sm:my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {state.approvedMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="text-sm sm:text-base text-green-800 font-semibold">
                {state.approvedMessage}
              </div>
            </div>
          )}
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
                Content Review
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(
                    state.selectedContent!.status
                  )}`}
                >
                  {state.selectedContent!.status === "rejected"
                    ? "❌ REJECTED"
                    : state.selectedContent!.status.toUpperCase()}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 capitalize">
                  {state.selectedContent!.type.replace("-", " ")}
                </span>
              </div>
            </div>
            <button
              onClick={() => clearSelected()}
              className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl ml-2 flex-shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Rejection Reason - Show prominently if rejected */}
          {state.selectedContent?.status === "rejected" &&
            state.selectedContent.reviewerNotes && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2 text-base sm:text-lg">
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  Rejection Reason
                </h4>
                <p className="text-sm sm:text-base text-red-800 leading-relaxed">
                  {state.selectedContent.reviewerNotes}
                </p>
                {state.selectedContent!.editedBy && (
                  <p className="text-xs sm:text-sm text-red-600 mt-3">
                    Reviewed by: {state.selectedContent!.editedBy}
                  </p>
                )}
              </div>
            )}

            {/* Content Details */}
          <div className="space-y-4 mb-4 sm:mb-6">
            {state.selectedContent?.slides && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                  Carousel Slides
                </h4>
                <div className="space-y-3">
                  {state.selectedContent.slides.map((slide) => (
                    <div
                      key={slide.number}
                      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-3 sm:p-4 border border-purple-200"
                    >
                      <div className="text-xs sm:text-sm font-bold text-purple-600 mb-2">
                        SLIDE {slide.number}
                      </div>
                      <p className="text-sm sm:text-base text-gray-900 font-medium mb-2">
                        {slide.text}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 italic">
                        💡 {slide.visualHint}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {state.selectedContent?.caption && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Caption
                </h4>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <p className="text-sm sm:text-base text-gray-900">
                    {state.selectedContent.caption}
                  </p>
                </div>
              </div>
            )}

            {state.selectedContent?.hashtags && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Hashtags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {state.selectedContent.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-full text-xs sm:text-sm"
                    >
                      #{tag.replace(/\s+/g, "")}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Review Notes */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
              Review Notes (Optional)
            </label>
            <textarea
              value={state.reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Add notes about edits or approval reasoning..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-beiersdorf-blue focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          {state.selectedContent!.status === "pending" && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => handleApprove(state.selectedContent!.id)}
                className="flex-1 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Approve & Publish</span>
                <span className="sm:hidden">Approve</span>
              </button>
              <button
                onClick={() => handleReject(state.selectedContent!.id)}
                className="flex-1 py-2.5 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Reject
              </button>
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-beiersdorf-blue bg-white text-beiersdorf-blue rounded-lg hover:bg-beiersdorf-light transition font-semibold flex items-center justify-center gap-2 text-sm sm:text-base">
                <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                Edit
              </button>
            </div>
          )}

          {state.selectedContent?.status === "approved" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-2" />
              <p className="text-sm sm:text-base text-green-800 font-medium">
                Content Approved & Published
              </p>
              {state.selectedContent!.approvedAt && (
                <p className="text-xs sm:text-sm text-green-600 mt-1">
                  {new Date(state.selectedContent!.approvedAt).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReviewDetailModal;
