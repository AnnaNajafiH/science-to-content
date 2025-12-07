import { FileText } from "lucide-react";

const BriefHeader:React.FC = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-2">
          <FileText className="w-7 h-7 text-orange-600" />
          Internal Brief Generator
        </h2>
        <p className="text-gray-600">
          Convert R&D research into campaign briefs and training materials
        </p>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            ✨ <strong>No approval required</strong> — Content is generated
            instantly for internal use
          </p>
        </div>
      </div>
    );
}
export default BriefHeader;