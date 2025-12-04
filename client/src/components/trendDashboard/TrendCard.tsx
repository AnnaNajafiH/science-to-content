import { TrendingUp, Flame, ArrowUp, Clock, Hash, Eye } from "lucide-react";
import type { Trend } from "../../types";

type TrendCardProps = {
  trend: Trend;
  onCreatePost?: (trendId: string) => void;
  onViewDetails?: (trend: Trend) => void;
};

const TrendCard: React.FC<TrendCardProps> = ({
  trend,
  onCreatePost,
  onViewDetails,
}) => {
  const getVelocityIcon = (velocity: Trend["velocity"]) => {
    switch (velocity) {
      case "hot":
        return <Flame className="w-5 h-5 text-red-500" />;
      case "rising":
        return <ArrowUp className="w-5 h-5 text-orange-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
    }
  };

  const getVelocityColor = (velocity: Trend["velocity"]) => {
    switch (velocity) {
      case "hot":
        return "bg-red-100 text-red-700 border-red-300";
      case "rising":
        return "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return "bg-blue-100 text-blue-700 border-blue-300";
    }
  };

  const isHot = trend.velocity === "hot";
  const baseBtn = isHot
    ? "text-xs text-white px-2.5 py-1 rounded-md font-bold shadow-lg transform-gpu hover:scale-105 transition whitespace-nowrap"
    : "text-xs bg-beiersdorf-blue text-white px-2.5 py-1 rounded-md font-medium hover:bg-beiersdorf-navy transition whitespace-nowrap";
  const hotBg = isHot
    ? "bg-gradient-to-r from-red-600 to-orange-500 pulse-glow-hot"
    : "bg-beiersdorf-blue";

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {getVelocityIcon(trend.velocity)}
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold border ${getVelocityColor(
              trend.velocity
            )}`}
          >
            {trend.velocity.toUpperCase()}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-beiersdorf-blue">
            {trend.score}
          </div>
          <div className="text-xs text-gray-500">Score</div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{trend.name}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {trend.description}
      </p>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Clock className="w-4 h-4" />
        {new Date(trend.detectedAt).toLocaleDateString()}
      </div>

      <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
        {trend.keywords.slice(0, 3).map((keyword) => (
          <span
            key={keyword}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs"
          >
            <Hash className="w-3 h-3" />
            {keyword.replace(/\s+/g, "")}
          </span>
        ))}
      </div>

      <div className="pt-3 border-t border-gray-200 space-y-2">
        <span className="text-xs text-gray-500 block">
          {trend.relatedPosts.length} related posts
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onCreatePost) onCreatePost(trend.id);
            }}
            className={`${baseBtn} ${hotBg}`}
            aria-label={
              isHot
                ? `Create post urgently for ${trend.name}`
                : `Create post for ${trend.name}`
            }
          >
            {isHot ? (
              <span className="flex items-center gap-1.5">
                <span>Act Now</span>
              </span>
            ) : (
              <span>Create Post</span>
            )}
          </button>

          {isHot && (
            <span className="urgent-badge bg-red-50 text-red-700 whitespace-nowrap px-2 py-1 text-xs rounded">
              🔥 High priority
            </span>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onViewDetails) onViewDetails(trend);
            }}
            className="text-xs text-beiersdorf-blue font-medium hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            <Eye className="w-3 h-3" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendCard;
