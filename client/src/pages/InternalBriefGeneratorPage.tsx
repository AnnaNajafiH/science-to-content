import { FileText, Loader2 } from "lucide-react";
import BriefHeader from "../components/InternalBriefGenerator/BriefHeader";
import BriefInputPanel from "../components/InternalBriefGenerator/BriefInputPanel";
import PreviousBriefs from "../components/InternalBriefGenerator/PreviousBriefs";
import { useInternalBrief } from "../Contexts/internalBriefContext/useInternalBrief";
import BriefEmailModal from "../components/InternalBriefGenerator/BriefEmailModal";
import BriefEmail from "../components/InternalBriefGenerator/BriefEmail";

const InternalBriefGeneratorPage: React.FC = () => {
  const { generatedBrief, generating, emailModalOpen } = useInternalBrief();

  return (
    <div className="space-y-6">
      <BriefHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <BriefInputPanel />
          <PreviousBriefs />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          {!generatedBrief && !generating && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <FileText className="w-16 h-16 mb-4 opacity-20" />
              <p>Select a document and generate a brief</p>
            </div>
          )}

          {emailModalOpen && <BriefEmailModal />}


          {generating && (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-12 h-12 animate-spin text-beiersdorf-blue mb-4" />
              <p className="text-gray-600">Creating internal brief...</p>
              <p className="text-sm text-gray-500 mt-2">
                Extracting key insights and formatting
              </p>
            </div>
          )}

          {generatedBrief && (
            <BriefEmail/>
          )}
        </div>
      </div>
    </div>
  );
};
export default InternalBriefGeneratorPage;
