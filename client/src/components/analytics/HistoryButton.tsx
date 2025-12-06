import { History } from "lucide-react";
import { postedHistory } from "../../data/analytics";

type HistoryButtonProps = {
  setShowHistory: (show: boolean) => void;
};

const HistoryButton: React.FC<HistoryButtonProps> = ({ setShowHistory }) => {
  return (
    <div className="bg-gradient-to-br from-beiersdorf-blue to-blue-700 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <History className="w-6 h-6" />
            Posted Content History
          </h3>
          <p className="text-sm opacity-90 mb-4">
            View all content that has been published across platforms
          </p>
          <button
            onClick={() => setShowHistory(true)}
            className="bg-white text-beiersdorf-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md flex items-center gap-2"
          >
            <History className="w-5 h-5" />
            View History ({postedHistory.length} posts)
          </button>
        </div>
        <div className="hidden lg:block text-6xl opacity-20">📊</div>
      </div>
    </div>
  );
};

export default HistoryButton;
