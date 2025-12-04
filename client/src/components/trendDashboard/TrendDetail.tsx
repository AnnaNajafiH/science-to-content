import type { Trend, SocialPost } from "../../types";

interface TrendDetailProps {
  selectedTrend: Trend;
  setSelectedTrend: (trend: Trend | null) => void;
}

function TrendDetail({ selectedTrend, setSelectedTrend }: TrendDetailProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setSelectedTrend(null)}
    >
      <div
        className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {selectedTrend.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {selectedTrend.description}
            </p>
          </div>
          <button
            onClick={() => setSelectedTrend(null)}
            className="text-gray-400 hover:text-gray-600 text-2xl flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
          <div className="bg-beiersdorf-light rounded-lg p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-bold text-beiersdorf-blue">
              {selectedTrend.score}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Trend Score</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="text-base sm:text-lg font-bold text-gray-900 capitalize">
              {selectedTrend.velocity}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Velocity</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="text-base sm:text-lg font-bold text-gray-900">
              {selectedTrend.relatedPosts.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Posts</div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {selectedTrend.keywords.map((keyword: string) => (
              <span
                key={keyword}
                className="px-3 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-full text-sm"
              >
                #{keyword.replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            Related Social Posts
          </h4>
          <div className="space-y-3">
            {selectedTrend.relatedPosts.map((post: SocialPost) => (
              <div key={post.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-900">
                    {post.author}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {post.platform}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{post.text}</p>
                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                  <span>❤️ {post.likes.toLocaleString()}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setSelectedTrend(null)}
          className="w-full py-3 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default TrendDetail;
