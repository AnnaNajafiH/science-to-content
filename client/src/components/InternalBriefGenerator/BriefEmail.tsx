import {
  BookOpen,
  Clock,
  Download,
  FileText,
  Mail,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { useInternalBrief } from "../../Contexts/internalBriefContext/useInternalBrief";

const BriefEmail: React.FC = () => {
  const {
    generatedBrief,
    shareMenuOpen,
    openEmailModal,
    exportBrief,
    toggleShareMenu,
  } = useInternalBrief();
  return (
    <div className="space-y-6 max-h-[800px] overflow-y-auto">
      {/* Header Section - Compact */}
      <div className="sticky top-0 bg-gradient-to-r from-beiersdorf-blue to-blue-600 rounded-t-xl p-4 shadow-md z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-semibold rounded-full">
                CAMPAIGN BRIEF
              </span>
              <div className="flex items-center gap-2 text-white/80 text-xs">
                <Users className="w-3 h-3" />
                <span>{generatedBrief?.targetAudience}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">
              {generatedBrief?.title.replace("Campaign Brief: ", "")}
            </h3>
          </div>
          <div className="relative flex items-center gap-2 flex-shrink-0">
            <button
              onClick={exportBrief}
              className="px-3 py-1.5 bg-white text-beiersdorf-blue rounded-lg hover:bg-blue-50 transition flex items-center gap-2 text-xs font-medium shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <div>
              <button
                onClick={() => toggleShareMenu()}
                className="px-3 py-1.5 bg-white/10 backdrop-blur text-white rounded-lg hover:bg-white/20 transition flex items-center gap-2 text-xs font-medium border border-white/20"
              >
                <Mail className="w-3.5 h-3.5" />
                Share
              </button>
            </div>

            {shareMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => {
                    if (shareMenuOpen) {
                      toggleShareMenu();
                    }
                  }}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <button
                    onClick={() => {
                      if (shareMenuOpen) {
                        toggleShareMenu();
                        openEmailModal();
                      }
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 rounded-t-lg"
                  >
                    <Mail className="w-4 h-4 text-gray-700" />
                    <span className="text-sm text-gray-900">
                      Send via Email
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      if (shareMenuOpen) {
                        toggleShareMenu();
                        window.open(
                          "https://login.microsoftonline.com/beiersdorf.com/oauth2/v2.0/authorize?client_id=c1c74fed-04c9-4704-80dc-9f79a2e515cb&scope=https%3A%2F%2Fwww.yammer.com%2Fuser_impersonation%20openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fweb.yammer.com%2Fmain%2Fauthredirect&client-request-id=019aa6bb-7602-7902-9a98-9fd7fe6aa8c3&response_mode=fragment&client_info=1&nonce=019aa6bb-7605-712f-8339-13091f4bd1e2&state=eyJpZCI6IjAxOWFhNmJiLTc2MDMtNzRkMi04MjY4LWM1MzM0YjRlNWQ4MiIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D&claims=%7B%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&x-client-SKU=msal.js.browser&x-client-VER=4.13.2&response_type=code&code_challenge=BXcQWYQn8UBmp7LufLrWo4oX6QgryHNd7A_OBt0Lczo&code_challenge_method=S256",
                          "_blank"
                        );
                      }
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 rounded-b-lg"
                  >
                    <svg
                      className="w-4 h-4 text-gray-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 3h6v6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 14L21 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm text-gray-900">Viva engage</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Headline Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-200">
        <h4 className="text-lg font-bold text-beiersdorf-blue mb-1">
          {generatedBrief?.headline}
        </h4>
        <p className="text-xs text-gray-500">
          Campaign headline for all materials
        </p>
      </div>

      {/* Key Proof Points */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
          <Shield className="w-5 h-5 text-beiersdorf-blue" />
          Key Proof Points
        </h4>
        <div className="space-y-4">
          {generatedBrief?.keyProofPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 shadow-sm border border-blue-100"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-beiersdorf-blue to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-2">
                    {point.point}
                  </p>
                  <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                    {point.evidence}
                  </p>
                  <div className="flex items-start gap-1 text-xs text-gray-500 italic bg-gray-50 rounded p-2">
                    <BookOpen className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{point.citation}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creative Hooks */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-600" />
          Creative Hooks
        </h4>
        <div className="space-y-3">
          {generatedBrief?.creativeHooks.map((hook, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-white rounded-lg border border-yellow-100 shadow-sm"
            >
              <span className="text-2xl">💡</span>
              <p className="text-sm text-gray-900 leading-relaxed flex-1">
                {hook}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Social Captions */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          Sample Social Captions
        </h4>
        <div className="space-y-3">
          {generatedBrief?.sampleCaptions.map((caption, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-4 border border-purple-100 shadow-sm"
            >
              <div className="flex items-start gap-2">
                <span className="text-purple-600 font-bold text-sm mt-0.5">
                  {idx + 1}.
                </span>
                <p className="text-sm text-gray-900 leading-relaxed flex-1">
                  {caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Training Snippets */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          Training Snippets
        </h4>
        <div className="space-y-3">
          {generatedBrief?.trainingSnippets.map((snippet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-white rounded-lg border border-green-100 shadow-sm"
            >
              <span className="text-green-600 font-bold text-lg">→</span>
              <p className="text-sm text-gray-900 leading-relaxed flex-1">
                {snippet}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-gray-50 rounded-xl p-6 border-t-2 border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>
              Generated: {new Date(generatedBrief?.generatedAt??"").toLocaleString()}
            </span>
          </div>
          <span className="px-3 py-1 bg-beiersdorf-light text-beiersdorf-blue rounded-full text-xs font-semibold">
            Ready to Use
          </span>
        </div>
      </div>
    </div>
  );
};
export default BriefEmail;
