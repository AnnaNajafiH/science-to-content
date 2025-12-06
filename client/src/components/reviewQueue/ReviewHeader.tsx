import { CheckCircle } from "lucide-react";
import { useReview } from "../../Contexts/reviewQueueContext/useReview";


const ReviewHeader: React.FC = () => {
  const { state } = useReview();
    return (
      <div className="flex flex-col lg:flex-row items-center justify-between  gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7 text-green-600" />
            <span className="hidden lg:inline">
              Human-in-the-Loop Review Queue
            </span>
            <span className="lg:hidden">Review Queue</span>
          </h2>
          <p className="text-sm lg:text-base text-gray-600 mt-1">
            Review and approve AI-generated content before publication
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className=" flex flex-col items-center gap-1 px-3 lg:px-4 py-1 bg-yellow-100 rounded-lg">
            <div className="text-lg lg:text-2xl font-bold text-yellow-700">
              {state.contents.filter((c) => c.status === "pending").length}
            </div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
        </div>
      </div>
    );
};

export default ReviewHeader;