import { BarChart3 } from "lucide-react";

const AnalyticsHeader: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
        <BarChart3 className="w-7 h-7 text-pink-600" />
        Analytics & Insights
      </h2>
      <p className="text-gray-600">
        Monitor system performance and content effectiveness
      </p>
    </div>
  );};
export default AnalyticsHeader;