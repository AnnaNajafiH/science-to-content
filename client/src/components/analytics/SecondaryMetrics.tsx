import { AlertCircle, BarChart3, Clock } from "lucide-react";
import { stats } from "../../data/analytics";

const SecondaryMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.avgConfidence}%
            </div>
            <div className="text-sm text-gray-600">Avg Confidence Score</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full"
            style={{ width: `${stats.avgConfidence}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.avgApprovalTime}
            </div>
            <div className="text-sm text-gray-600">Avg Review Time</div>
          </div>
        </div>
        <p className="text-xs text-gray-500">From generation to approval</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.reviewerEditRate}%
            </div>
            <div className="text-sm text-gray-600">Reviewer Edit Rate</div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Content modified before approval
        </p>
      </div>
    </div>
  );
};

export default SecondaryMetrics;
