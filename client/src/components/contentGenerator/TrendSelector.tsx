import type{ Trend } from "../../types/index";

type TrendSelectorProps = {
  trends: Trend[];
  selectedTrend: string;
  setSelectedTrend: (id: string) => void;
  selectedTrendData?: Trend | undefined;
};

export default function TrendSelector({
  trends,
  selectedTrend,
  setSelectedTrend,
  selectedTrendData,
}: TrendSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3">
        Select Trend
      </label>
      <select
        value={selectedTrend}
        onChange={(e) => setSelectedTrend(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beiersdorf-blue focus:border-transparent"
      >
        {trends.map((trend) => (
          <option key={trend.id} value={trend.id}>
            {trend.name} (Score: {trend.score})
          </option>
        ))}
      </select>

      {selectedTrendData && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            {selectedTrendData.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTrendData.keywords.slice(0, 4).map((keyword: string) => (
              <span
                key={keyword}
                className="text-xs px-2 py-1 bg-white rounded-md text-gray-600"
              >
                #{keyword.replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
