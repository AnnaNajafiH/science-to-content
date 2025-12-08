import ContentList from "../components/reviewQueue/ContentList";
import ReviewFilter from "../components/reviewQueue/ReviewFilter";
import ReviewHeader from "../components/reviewQueue/ReviewHeader";
import { useReview } from "../Contexts/reviewQueueContext/useReview";
import ReviewDetailModal from "../components/reviewQueue/ReviewDetailModal";
import ConfettiCanvas from "../components/common/ConfettiCanvas";

const ReviewQueue: React.FC = () => {
  const { state } = useReview();
  const { showConfetti } = state;

  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-beiersdorf-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading review queue...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {showConfetti && <ConfettiCanvas />}

      {/* Header */}
      <div>
        <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-200">
          <ReviewHeader />
          <ReviewFilter />
        </div>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 gap-4">
        <ContentList />
      </div>

      {/* Review Detail Modal */}
      <div>{state.selectedContent && <ReviewDetailModal />}</div>
    </div>
  );
};
export default ReviewQueue;
