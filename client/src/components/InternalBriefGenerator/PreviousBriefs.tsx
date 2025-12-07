import { useInternalBrief } from "../../Contexts/internalBriefContext/useInternalBrief";

const PreviousBriefs: React.FC = () => {
    const { briefs } = useInternalBrief();
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Briefs</h3>
        <div className="space-y-3">
          {briefs.map((brief) => (
            <div
              key={brief.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              <h4 className="font-medium text-gray-900 text-sm mb-1">
                {brief.title}
              </h4>
              <p className="text-xs text-gray-500">
                {new Date(brief.generatedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
};
export default PreviousBriefs;
