// TrendList: small presentational wrapper for the trends grid
import type { Trend } from "../../types";
import TrendCard from "../trendDashboard/TrendCard";

type TrendListProps = {
  trends: Trend[];
  onCreatePost?: (trendId: string) => void;
  onViewDetails?: (trend: Trend) => void;
};

const TrendList: React.FC<TrendListProps> = ({
  trends,
  onCreatePost,
  onViewDetails,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-6">
      {trends.map((trend) => (
        <div
          key={trend.id}
          onClick={() => onViewDetails && onViewDetails(trend)}
        >
          <TrendCard
            trend={trend}
            onCreatePost={onCreatePost}
            onViewDetails={onViewDetails}
          /> 
        </div>
      ))}
    </div>
  );
};

export default TrendList;
