import { CheckCircle, Clock, Eye, XCircle } from "lucide-react";
import { useReview } from "../../Contexts/reviewQueueContext/useReview";


const ReviewFilter: React.FC = () => {
  const { state, setFilter } = useReview();
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {(["all", "pending", "approved", "rejected"] as const).map(
        (filterOption) => {
          // Define button styling based on filter type
          let activeStyle = "";
          let inactiveStyle = "";
          let icon = null;

          switch (filterOption) {
            case "rejected":
              activeStyle = "bg-red-600 text-white shadow-md";
              inactiveStyle =
                "bg-red-50 text-red-700 border-2 border-red-300 hover:bg-red-100";
              icon = <XCircle className="w-4 h-4" />;
              break;
            case "approved":
              activeStyle = "bg-green-600 text-white shadow-md";
              inactiveStyle =
                "bg-green-50 text-green-700 border-2 border-green-300 hover:bg-green-100";
              icon = <CheckCircle className="w-4 h-4" />;
              break;
            case "pending":
              activeStyle = "bg-yellow-600 text-white shadow-md";
              inactiveStyle =
                "bg-yellow-50 text-yellow-700 border-2 border-yellow-300 hover:bg-yellow-100";
              icon = <Clock className="w-4 h-4" />;
              break;
            case "all":
              activeStyle = "bg-beiersdorf-blue text-white shadow-md";
              inactiveStyle =
                "bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200";
              icon = <Eye className="w-4 h-4" />;
              break;
          }

          return (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition capitalize flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                state.filter === filterOption ? activeStyle : inactiveStyle
              }`}
            >
              {icon}
              <span className="whitespace-nowrap">{filterOption}</span>
            </button>
          );
        }
      )}
    </div>
  );
};

export default ReviewFilter;
