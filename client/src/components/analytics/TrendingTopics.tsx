import { TrendingUp } from "lucide-react";
import { trendingTopics } from "../../data/analytics";

const TrendingTopics: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-beiersdorf-blue" />
        Top Trending Topics
      </h3>
      <div className="space-y-4">
        {trendingTopics.map((topic, idx) => (
          <div key={topic.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 bg-gradient-to-br from-beiersdorf-blue to-beiersdorf-accent text-white rounded-lg flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{topic.name}</p>
                <p className="text-sm text-gray-500">
                  {topic.posts.toLocaleString()} mentions
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              {topic.growth}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TrendingTopics;
