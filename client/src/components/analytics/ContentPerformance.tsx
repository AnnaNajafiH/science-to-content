import { BarChart3 } from "lucide-react";
import { contentPerformance } from "../../data/analytics";

const ContentPerformance: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-beiersdorf-blue" />
        Content Type Performance
      </h3>
      <div className="space-y-4">
        {contentPerformance.map((item) => (
          <div
            key={item.type}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{item.type}</h4>
              <span className="text-sm text-gray-500">
                {item.avgConfidence}% confidence
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex-1">
                <div className="text-gray-600 mb-1">Generated</div>
                <div className="font-bold text-gray-900">{item.generated}</div>
              </div>
              <div className="flex-1">
                <div className="text-gray-600 mb-1">Approved</div>
                <div className="font-bold text-green-600">{item.approved}</div>
              </div>
              <div className="flex-1">
                <div className="text-gray-600 mb-1">Rate</div>
                <div className="font-bold text-beiersdorf-blue">
                  {Math.round((item.approved / item.generated) * 100)}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-beiersdorf-blue h-2 rounded-full"
                style={{
                  width: `${(item.approved / item.generated) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ContentPerformance;
