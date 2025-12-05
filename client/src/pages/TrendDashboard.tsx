import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTrends } from "../Contexts/trendDashboardContext/useTrend.ts";
import TrendHeader from "../components/trendDashboard/TrendHeader.tsx";
import TrendFilters from "../components/trendDashboard/TrendFilters.tsx";
import TrendList from "../components/trendDashboard/TrendList.tsx";
import TrendDetail from "../components/trendDashboard/TrendDetail.tsx";

type TrendDashboardProps = {
  onCreatePost?: (trendId: string) => void;
};
const TrendDashboard: React.FC<TrendDashboardProps> = ({ onCreatePost }) => {
  const navigate = useNavigate();
  const { state, loadTrends, setFilter, selectTrend } = useTrends();
  const { trends, loading, filter, selectedTrend, error } = state;

  const filteredTrends = useMemo(
    () => trends.filter((trend) => filter === "all" || trend.velocity === filter),
    [trends, filter]
  );

  const handleCreatePost = useCallback(
    (trendId: string) => {
      if (onCreatePost) onCreatePost(trendId);
      else navigate("/generate", { state: { preselectedTrendId: trendId } });
    },
    [onCreatePost, navigate]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beiersdorf-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Detecting trends...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="mt-4 text-red-600">Error: {error}</p>
          <button
            onClick={loadTrends}
            className="mt-4 bg-beiersdorf-blue text-white px-4 py-2 rounded-md hover:bg-beiersdorf-navy transition"
          >
            {" "}
            Retry Loading Trends{" "}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <TrendHeader onRefresh={loadTrends} />
        <TrendFilters filter={filter} setFilter={setFilter} />

        {/* Trends Grid */}
        <TrendList
          trends={filteredTrends}
          onCreatePost={handleCreatePost}
          onViewDetails={(trend) => selectTrend(trend)}
        />

        {/* Trend Detail Modal */}
        {selectedTrend && (
          <TrendDetail
            selectedTrend={selectedTrend}
            setSelectedTrend={() => selectTrend(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TrendDashboard;
