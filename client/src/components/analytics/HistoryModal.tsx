import { Calendar, ExternalLink, History, Instagram } from "lucide-react";
import { postedHistory } from "../../data/analytics";


type HistoryModalProps = {
  setShowHistory: (show: boolean) => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  setShowHistory,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={() => setShowHistory(false)}
    >
      <div
        className="relative max-w-5xl w-full my-8 bg-white rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-xl p-6 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <History className="w-7 h-7 text-beiersdorf-blue" />
              Posted Content History
            </h2>
            <button
              onClick={() => setShowHistory(false)}
              className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            All content published to social media platforms
          </p>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            {postedHistory.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Instagram className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {post.topic}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-full text-sm font-semibold">
                        {post.type}
                      </span>
                      {post.slides > 1 && (
                        <span className="text-sm text-gray-600">
                          {post.slides} slides
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-red-500">❤️</span>
                        <span className="font-semibold text-gray-700">
                          {post.likes.toLocaleString()}
                        </span>
                        <span className="text-gray-500">likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">💬</span>
                        <span className="font-semibold text-gray-700">
                          {post.comments}
                        </span>
                        <span className="text-gray-500">comments</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition font-medium flex items-center gap-2 whitespace-nowrap"
                  >
                    View Post
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {postedHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-20">📭</div>
              <p className="text-gray-500 text-lg">
                No content has been posted yet
              </p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 rounded-b-xl p-4">
          <button
            onClick={() => setShowHistory(false)}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default HistoryModal;