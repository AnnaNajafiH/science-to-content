import { CheckCircle, Eye, TrendingUp } from "lucide-react";
import {stats} from "../../data/analytics"

const KeyMetrics: React.FC = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-80">Last 30 Days</span>
          </div>
          <div className="text-4xl font-bold mb-1">{stats.trendsDetected}</div>
          <div className="text-sm opacity-90">Trends Detected</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-80">Total</span>
          </div>
          <div className="text-4xl font-bold mb-1">
            {stats.contentGenerated}
          </div>
          <div className="text-sm opacity-90">Content Pieces Generated</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 opacity-80" />
            <span className="text-sm font-medium opacity-80">
              Approval Rate
            </span>
          </div>
          <div className="text-4xl font-bold mb-1">
            {Math.round((stats.contentApproved / stats.contentGenerated) * 100)}
            %
          </div>
          <div className="text-sm opacity-90">
            {stats.contentApproved} Approved
          </div>
        </div>
      </div>
    );
};
export default KeyMetrics;