import { TrendingUp, Clock } from "lucide-react";

type TrendHeaderProps = {
  onRefresh: () => void;
};

const TrendHeader: React.FC<TrendHeaderProps> = ({ onRefresh }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-beiersdorf-blue" />
            Trend Detection Dashboard
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Real-time social media trend analysis for skincare science
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-beiersdorf-blue text-white rounded-lg hover:bg-beiersdorf-navy transition flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap self-start sm:self-auto"
        >
          <Clock className="w-4 h-4" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default TrendHeader;
