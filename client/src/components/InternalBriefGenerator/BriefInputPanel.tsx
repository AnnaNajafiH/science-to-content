import { BookOpen, Loader2, Sparkles, Users } from "lucide-react";
import { useInternalBrief } from "../../Contexts/internalBriefContext/useInternalBrief";
import React from "react";

const BriefInputPanel:React.FC = () => {
    const {
      selectedDoc,
      setSelectedDoc,
      rdDocuments,
      targetAudience,
      setTargetAudience,
      generating,
      generateBrief,
    } = useInternalBrief();

    const selectedDocData = React.useMemo(() => rdDocuments.find(doc => doc.id === selectedDoc), [rdDocuments, selectedDoc]);
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Select R&D Document
          </label>
          <select
            value={selectedDoc}
            onChange={(e) => setSelectedDoc(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beiersdorf-blue focus:border-transparent"
          >
            {rdDocuments.length === 0 && (
              <option value="">No R&D documents available</option>
            )}
            {rdDocuments.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>

          {selectedDocData && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Summary
                </p>
                <p className="text-sm text-gray-700">
                  {selectedDocData.summary}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Key Ingredients
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedDocData.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-xs px-2 py-1 bg-white rounded-md text-gray-600"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Study Type
                </p>
                <span className="text-sm px-2 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-md">
                  {selectedDocData.studyType}
                </span>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Target Audience
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g., Marketing Teams, Sales, Training"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beiersdorf-blue focus:border-transparent"
          />
        </div>

        <button
          onClick={generateBrief}
          disabled={generating || !selectedDoc || rdDocuments.length === 0}
          className="w-full py-4 bg-gradient-to-r from-purple-600 via-beiersdorf-blue to-blue-600 text-white rounded-lg hover:from-purple-700 hover:via-beiersdorf-navy hover:to-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          {generating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Brief...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Internal Brief
            </>
          )}
        </button>
      </div>
    );
}
export default BriefInputPanel;